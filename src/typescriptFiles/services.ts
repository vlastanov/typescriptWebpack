import Promise from "ts-promise";

export class Utils {

    frameMaterials() {

        let pvc = $('#pvcMaterial')
        let aluminium = $('#aluminiumMaterial')
        let noShutter = $('#radioBoxEmpty')

        let pvcContainer = $('#pvcContainer')
        let aluminiumContainer = $('#aluminiumContainer')

        pvc.change(function () {
            if (pvc.is(':checked')) {
                pvcContainer.removeClass('hideSelect')
                aluminiumContainer.addClass('hideSelect')
            }
        });

        aluminium.change(function () {
            if (aluminium.is(':checked')) {
                pvcContainer.addClass('hideSelect')
                aluminiumContainer.removeClass('hideSelect')
            }
        });

        noShutter.change(function () {
            if (noShutter.is(':checked')) {
                pvcContainer.addClass('hideSelect')
                aluminiumContainer.addClass('hideSelect')
            }
        });
    }

    frameMaterials2() {
        let ednokril = $('#ednokril')
        let dvukril = $('#dvukril')
        let noSchema = $('#noSchema')

        let ednokrilSection = $('#ednokrilSection')
        let dvukrilSection = $('#dvukrilSection')
        let hideAll = $('#hideAll')

        ednokril.change(function () {
            if (ednokril.is(':checked')) {
                ednokrilSection.removeClass('hideSelect')
                dvukrilSection.addClass('hideSelect')
                hideAll.addClass('hideSelect')
            }
        });

        dvukril.change(function () {
            if (dvukril.is(':checked')) {
                ednokrilSection.addClass('hideSelect')
                dvukrilSection.removeClass('hideSelect')
                hideAll.addClass('hideSelect')
            }
        });

        noSchema.change(function () {
            if (noSchema.is(':checked')) {
                ednokrilSection.addClass('hideSelect')
                dvukrilSection.addClass('hideSelect')
                hideAll.removeClass('hideSelect')

                $('#test1').attr('src', '')
                $('#test1').attr('data-snimka-id', '')
            }
        });
    }

    shutters() {
        let roller = $('#rollerShutter')
        let wingShutter = $('#wingShutter')
        let noShutter = $('#shutterEmpty')

        let selectedRollerShutter = $('#rollerContainer')
        let selectedNormalShutter = $('#wingShutterContainer')

        roller.change(function () {
            if (roller.is(':checked')) {
                selectedRollerShutter.removeClass('hideSelect')
                selectedNormalShutter.addClass('hideSelect')
                $('#testRoller').removeClass('hideSelect')
            }
        });

        wingShutter.change(function () {
            if (wingShutter.is(':checked')) {
                selectedRollerShutter.addClass('hideSelect')
                selectedNormalShutter.removeClass('hideSelect')
                $('#testRoller').addClass('hideSelect')

            }
        });

        noShutter.change(function () {
            if (noShutter.is(':checked')) {
                selectedRollerShutter.addClass('hideSelect')
                selectedNormalShutter.addClass('hideSelect')
                $('#testRoller').addClass('hideSelect')
            }
        });
    }

    //да премахна селекта. Не е нужен, защото стаклото се определя от профила
    fillingMaterials() {

        let dvoen = $('#staklopaketDvoen')
        let troen = $('#staklopaketTroen')
        let panel = $('#staklopaketPanel')
        let noStaklopaket = $('#staklopaketEmpty')

        let selectedDvoen = $('#dvoenStaklopaketContainer')
        let selectedTroen = $('#troenStaklopaketContainer')
        let selectedPanel = $('#panelStaklopaketContainer')

        dvoen.change(function () {
            if (dvoen.is(':checked')) {
                selectedDvoen.removeClass('hideSelect')
                selectedTroen.addClass('hideSelect')
                selectedPanel.addClass('hideSelect')
            }
        });

        troen.change(function () {
            if (troen.is(':checked')) {
                selectedTroen.removeClass('hideSelect')
                selectedDvoen.addClass('hideSelect')
                selectedPanel.addClass('hideSelect')
            }
        });

        panel.change(function () {
            if (panel.is(':checked')) {
                selectedPanel.removeClass('hideSelect')
                selectedDvoen.addClass('hideSelect')
                selectedTroen.addClass('hideSelect')
            }
        });

        noStaklopaket.change(function () {
            if (noStaklopaket.is(':checked')) {
                selectedDvoen.addClass('hideSelect')
                selectedTroen.addClass('hideSelect')
                selectedPanel.addClass('hideSelect')
            }
        });
    }

    mreji() {
        $('#checkBoxMreja').change(function () {


            if ($('#checkBoxMreja').is(':checked')) {
                let option1 = $(`<option value="static">статична</option>`)
                let option2 = $(`<option value="sliding">плъзгана</option>`)
                let select = $(`<select class="form-control" name="selectMreja" id="selectMreja"></select>`)
                select
                    .append(option1)
                    .append(option2)
                let root = $('#forSelectMreja')
                    .append(select)

                // console.log(root.html())
            } else {
                $('#forSelectMreja').html('')
            }
        });
    }
}

export class ClientsService {
    requester: Requester
    constructor() {
        this.requester = new Requester()
    }
    loadClients() {
        return this.requester.get('appdata', 'frameClients', 'kinvey');
    }


    loadClientsByName(name) {

        let endpoint = `frameClients/?query={"name":"${name}"}`
        return this.requester.get('appdata', endpoint, 'kinvey');
    }

    createClient(name) {
        let frameClientData = {
            name: name
        };
        return this.requester.post('appdata', 'frameClients', 'kinvey', frameClientData);
    }

    loadFrameDetails(frameClientId) {
        return this.requester.get('appdata', 'frameClients/' + frameClientId, 'kinvey');
    }

    edit(frameClientId, name) {
        let frameClientData = {
            name: name,
            author: sessionStorage.getItem('username')
        };

        return this.requester.update('appdata', 'frameClients/' + frameClientId, 'kinvey', frameClientData);
    }
}

export class FramesService {
    requester: Requester
    constructor() {
        this.requester = new Requester()
    }
    loadTeams() {
        // Request teams from db
        return this.requester.get('appdata', 'frames', 'kinvey');
    }

    createFrame(width, height, client) {
        let frameData = {
            width: width,
            height: height,
            client: client
        };

        return this.requester.post('appdata', 'frames', 'kinvey', frameData);
    }

    createFrame2(jsonOutput) {
        // let frameData = {
        //     srcId: jsonOutput.srcId,
        //     kasa: jsonOutput.kasa,
        //     krilo: jsonOutput.krilo,
        //     mreja: jsonOutput.mreja,
        //     rollerShutter: jsonOutput.rollerShutter,
        // };

        let frameData = {
            snimkaId: jsonOutput.snimkaId,
            instanceObject: jsonOutput
        }

        // console.log(frameData)
        // if (jsonOutput) {
        //     throw new Error('do tuk')
        // }

        return this.requester.post('appdata', 'frames', 'kinvey', frameData);
    }

    loadFrameDetails(frameId) {
        return this.requester.get('appdata', 'frames/' + frameId, 'kinvey');
    }

    edit(frameId, width, height) {
        console.log(width, height)
        let frameData = {
            width: width,
            height: height,
            author: sessionStorage.getItem('username')
        };

        return this.requester.update('appdata', 'frames/' + frameId, 'kinvey', frameData);
    }
}

export class Auth {
    requester: Requester
    constructor() {
        this.requester = new Requester()
    }
    saveSession(userInfo) {

        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authtoken', userAuth);

        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);

        let username = userInfo.username;
        sessionStorage.setItem('username', username);

        // sessionStorage.setItem('teamId', userInfo.teamId);
    }

    login(username, password) {
        let userData = {
            username,
            password
        };
        return this.requester.post('user', 'login', 'basic', userData);
    }

    register(username, password, repeatPassword) {
        let userData = {
            username,
            password
        };

        return this.requester.post('user', '', 'basic', userData);
    }

    logout() {
        let logoutData = {
            authtoken: sessionStorage.getItem('authtoken')
        };

        return this.requester.post('user', '_logout', 'kinvey', logoutData);
    }

    handleError(reason) {
        this.showError(reason["responseJSON"]["description"]);
    }

    showError(message) {
        let errorBox = $('#errorBox');
        errorBox.text(message);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 6000);
    }

    showInfo(message) {
        let infoBox = $('#infoBox');
        infoBox.text(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    }

}

class Requester {
    kinveyBaseUrl
    kinveyAppKey
    kinveyAppSecret

    constructor() {
        this.kinveyBaseUrl = "https://baas.kinvey.com/";
        this.kinveyAppKey = "kid_r1iqJAUIf";
        this.kinveyAppSecret = "8c8252aa135c43a98867fd5c56f5b959";
    }

    makeAuth(type) {
        return type === 'basic'
            ? 'Basic ' + btoa(this.kinveyAppKey + ':' + this.kinveyAppSecret)
            : 'Kinvey ' + sessionStorage.getItem('authtoken');
    }

    makeRequest(method, module, endpoint, auth) {
        let req = {
            method,
            url: this.kinveyBaseUrl + module + '/' + this.kinveyAppKey + '/' + endpoint,
            headers: {
                'Authorization': this.makeAuth(auth)
            }
        };

        return req
    }

    //ne e testvano
    get(module, endpoint, auth) {
        return $.ajax(this.makeRequest('GET', module, endpoint, auth));
    }

    post(module, endpoint, auth, data) {
        let req = this.makeRequest('POST', module, endpoint, auth);
        req["data"] = data;
        return $.ajax(req);
    }

    //ne e testvano
    update(module, endpoint, auth, data) {
        let req = this.makeRequest('PUT', module, endpoint, auth);
        req["data"] = data;
        return $.ajax(req);
    }

    //ne e testvano   
    remove(module, endpoint, auth) {
        return $.ajax(this.makeRequest('DELETE', module, endpoint, auth));
    }
}
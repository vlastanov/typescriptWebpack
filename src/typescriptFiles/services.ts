import Promise from "ts-promise";

export class Utils {

    shtori3() {

        let rollerShutter = $('#checkBoxShtora')
        let normalShutter = $('#checkBoxKapak')
        let noShutter = $('#radioBoxEmpty')

        let selectedRollerShutter = $('#forselectShtora')
        let selectedNormalShutter = $('#forselectKapakRadio')

        rollerShutter.change(function () {
            if (rollerShutter.is(':checked')) {
                selectedRollerShutter.removeClass('hideSelect')
                selectedNormalShutter.addClass('hideSelect')
            }
        });

        normalShutter.change(function () {
            if (normalShutter.is(':checked')) {
                selectedRollerShutter.addClass('hideSelect')
                selectedNormalShutter.removeClass('hideSelect')
            }
        });

        noShutter.change(function () {
            if (noShutter.is(':checked')) {
                selectedRollerShutter.addClass('hideSelect')
                selectedNormalShutter.addClass('hideSelect')
            }
        });
    }

    staklopeket2() {

        let dvoen = $('#staklopaketDvoen')
        let troen = $('#staklopaketTroen')
        let panel = $('#staklopaketPanel')
        let noStaklopaket = $('#radioBoxEmpty')

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

    shtori2() {
        $('#forselectShtora').html('')
        $('#forselectKapakRadio').html('')
        $('#checkBoxShtora').change(function () {

            if ($('#checkBoxShtora').is(':checked')) {

                let option1 = $(`<option value="overframe">надградена</option>`)
                let option2 = $(`<option value="frontframe">предна</option>`)
                let select = $(`<select class="form-control" name="selectShtora" id="selectShtora"></select>`)
                select
                    .append(option1)
                    .append(option2)
                let root = $('#forselectShtora')
                    .append(select)

                $('#forselectKapakRadio').html('')
            }
        });

        $('#checkBoxKapak').change(function () {
            if ($('#checkBoxKapak').is(':checked')) {
                let option1 = $(`<option value="kapak1">капак1</option>`)
                let option2 = $(`<option value="kapak2">капак2</option>`)
                let select = $(`<select class="form-control" name="selectKapak" id="selectKapak"></select>`)
                select
                    .append(option1)
                    .append(option2)
                let root = $('#forselectKapakRadio')
                    .append(select)

                $('#forselectShtora').html('')
            }
        });



        $('#radioBoxEmpty').change(function () {
            if ($('#radioBoxEmpty').is(':checked')) {
                $('#forselectShtora').html('')
                $('#forselectKapakRadio').html('')
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

    mestaklopaketi() {

        $('#staklopaket1').change(function () {

            let value = $('#staklopaket1').val()
            let selectProfil = $('#profilModel').val()

            if (value === 'dvoen') {
                let option1 = $(`<option value="wk">Бяло+Ка</option>`)
                let option2 = $(`<option value="ww">Бяло+Бяло</option>`)
                let select = $(`<select class="form-control" name="selectGlass" id="selectGlass"></select>`)
                select
                    .append(option1)
                    .append(option2)
                let root = $('#selectGlassPanel')
                    .append(select)

                // console.log(root.html())
            } else if (value === 'troen') {
                // console.log('troen')

            } else if (value === '') {
                console.log('troen')
                $('#selectGlassPanel').html('')

            }
        })
    }

    izberiProfilPoMaterial() {
        $('#profilMaterial').change(function () {

            let value = $('#profilMaterial').val()
            if (value === 'pvc') {
                let option1 = $(`<option value="kbe">KBE</option>`)
                let option2 = $(`<option value="kommerling76">Kommerling 76</option>`)
                let select = $(`<select  class="form-control" name="profilModel" id="profilModel"></select>`)

                // $("#foo").bind("click", function () {
                //     alert("User clicked on 'foo.'");
                // });

                select
                    // .bind('change', function () {
                    //     alert("User clicked on 'foo.'");
                    // })
                    .append(option1)
                    .append(option2)
                let root = $('#selectProfilPanel')
                    .append(select)

                // console.log(root.html())
            } else if (value === 'aluminium') {
                console.log('alminum profils')

            } else if (value === '') {
                $('#selectProfilPanel').html('')

            }
        })
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
        setTimeout(() => errorBox.fadeOut(), 3000);
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
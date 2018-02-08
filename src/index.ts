import { Auth, FramesService, ClientsService, Utils } from "./typescriptFiles/services"
import {
    EdnoKriloOpenTiltHingesLeft, KriloOpenTilt,
    Krilo, Kasa, RollerShutter, ProcessData, SystemsMaterial
} from "./typescriptFiles/frameClasses";





$(() => {

    let utils = new Utils()

    const app = Sammy('#main', function () {
        let auth = new Auth()
        let framesService = new FramesService()
        let clientsService = new ClientsService()
        this.use('Handlebars', 'hbs')

        this.get('/', displayHome)
        this.get('#/home', displayHome)
        function displayHome(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null
            ctx.username = sessionStorage.getItem('username')

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                object: './templates/home/homeObject.hbs',
            }).then(function () {
                this.partial('./templates/home/homePage.hbs').then(function () {
                    let all = $('.ddd')
                    all.click(function (e) {
                        console.log($(e.target).attr('data-in'))
                    })
                })
            })

        }


        this.get('#/login', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null
            ctx.username = sessionStorage.getItem('username')
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                loginForm: './templates/credentials/login/loginForm.hbs',
            }).then(function () {
                this.partial('./templates/credentials/login/loginPage.hbs')

            })
        })
        this.post('#/login', function (ctx) {
            let username = ctx.params.username
            let password = ctx.params.password

            auth.login(username, password)
                .then(function (userinfo) {
                    auth.saveSession(userinfo)
                    auth.showInfo('LOGGED IN')
                    ctx.redirect('#/home')
                })
                .catch((e) => {
                    console.log(e["responseJSON"]["description"])
                    auth.showError(e["responseJSON"]["description"]);
                })
        })

        this.get('#/register', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null
            ctx.username = sessionStorage.getItem('username')

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                registerForm: './templates/credentials/register/registerForm.hbs',
            }).then(function () {
                this.partial('./templates/credentials/register/registerPage.hbs')

            })
        })
        this.post('#/register', function (ctx) {
            let username = ctx.params.username
            let password = ctx.params.password
            let repeatPassword = ctx.params.repeatPassword

            if (password !== repeatPassword) {
                auth.showError("Passwords doesn't match")
            } else {
                auth.register(username, password, repeatPassword)
                    .then(function (userinfo) {
                        console.log(userinfo)
                        auth.saveSession(userinfo)
                        auth.showInfo('registered')
                        displayHome(ctx)
                    })
                    .catch((e) => {
                        auth.showError(e["responseJSON"]["description"]);
                    })
            }


        })
        this.get('#/logout', function (ctx) {
            auth.logout()
                .then(function () {
                    sessionStorage.clear()
                    auth.showInfo('Logged out')
                    displayHome(ctx)
                })
                .catch((e) => {
                    console.log(e["responseJSON"]["description"])
                    auth.showError(e["responseJSON"]["description"]);
                })
        })



        this.get('#/catalog', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null
            ctx.username = sessionStorage.getItem('username')

            framesService.loadTeams()
                .then((frames) => {
                    // ctx.hasNoTeam = sessionStorage.getItem('teamId') === null
                    //     || sessionStorage.getItem('teamId') === 'undefined'
                    ctx.frames = frames
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        frame: './templates/frames/frame.hbs',
                    }).then(function () {
                        this.partial('./templates/frames/framesCatalog.hbs')
                    })

                })
        })
        this.get('#/catalog/create', function (ctx) {

            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null
            ctx.username = sessionStorage.getItem('username')

            clientsService.loadClients()
                .then((clients) => {
                    ctx.clients = clients
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        createForm: './templates/frames/create/createForm.hbs',
                        client: './templates/frames/clients/frameClient.hbs',
                    }).then(function () {
                        this.partial('./templates/frames/create/createPage.hbs')
                            .then(function () {
                                utils.izberiProfilPoMaterial()
                                utils.mestaklopaketi()
                                utils.shtori()
                            })

                    })
                })


        })
        this.post('#/catalog/create', function (ctx) {
            let snimkaName = $('#test1').attr('data-snimka')
            ctx.params['snimkaName'] = snimkaName

            let output = new ProcessData(ctx.params)

            try {
                console.log(output.produceOutput())
                
            } catch (error) {
                console.log(error)
                auth.showError(error.message);
            }

            // framesService
            //     .createFrame(width, height, client)
            //     .then(function (teamInfo) {
            //         auth.showInfo('Frame Has been created')
            //         ctx.redirect('#/catalog')
            //     })
            //     .catch((e) => {
            //         console.log(e["responseJSON"]["description"])
            //         auth.showError(e["responseJSON"]["description"]);
            //     })
        })
        this.get('#/catalog/:id', function (ctx) {
            let frameId = ctx.params.id.substr(1)

            framesService.loadFrameDetails(frameId)
                .then(function (frameInfo) {
                    ctx.height = frameInfo['height']
                    ctx.width = frameInfo['width']
                    ctx.frameId = frameId
                    ctx.isAuthor = frameInfo._acl.creator === sessionStorage.getItem('userId')

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        frameControls: './templates/frames/detail/frameControls.hbs',
                        frameDetailsForm: './templates/frames/detail/frameDetailsForm.hbs',
                    }).then(function () {
                        this.partial('./templates/frames/detail/detailsPage.hbs')
                    })
                })
                .catch((e) => {
                    console.log(e["responseJSON"]["description"])
                    auth.showError(e["responseJSON"]["description"]);
                })


        })
        this.get('#/catalog/edit/:id', function (ctx) {
            let frameId = ctx.params.id.substr(1)
            framesService.loadFrameDetails(frameId)
                .then(function (frameInfo) {
                    ctx.frameId = frameId
                    ctx.width = frameInfo.width
                    ctx.height = frameInfo.height
                    ctx.loadPartials({
                        header: '../templates/common/header.hbs',
                        editForm: './templates/frames/edit/editForm.hbs'
                    }).then(function () {
                        this.partial('./templates/frames/edit/editPage.hbs')
                    })

                })
                .catch((e) => {
                    console.log(e["responseJSON"]["description"])
                    auth.showError(e["responseJSON"]["description"]);
                })

        })
        this.post('#/catalog/edit/:id', function (ctx) {

            let frameId = ctx.params.id.substr(1)
            let width = ctx.params.width
            let height = ctx.params.height
            framesService
                .edit(frameId, width, height)
                .then(function (teamInfo) {
                    auth.showInfo('Frame Has been edited')
                    ctx.redirect('#/catalog')
                })
                .catch((e) => {
                    console.log(e["responseJSON"]["description"])
                    auth.showError(e["responseJSON"]["description"]);
                })
        })

        this.get('#/frameClients', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null
            ctx.username = sessionStorage.getItem('username')

            clientsService.loadClients()
                .then((clients) => {
                    // ctx.hasNoTeam = sessionStorage.getItem('teamId') === null
                    //     || sessionStorage.getItem('teamId') === 'undefined'
                    ctx.clients = clients
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        client: './templates/frames/clients/frameClient.hbs',
                    }).then(function () {
                        this.partial('./templates/frames/clients/framesClientCatalog.hbs')
                    })

                })
        })
        this.get('#/frameClients/create', function (ctx) {

            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null
            ctx.username = sessionStorage.getItem('username')

            ctx.loadPartials({

                header: './templates/common/header.hbs',
                createForm: './templates/frames/clients/create/createForm.hbs',
            }).then(function () {
                this.partial('./templates/frames/clients/create/createPage.hbs')

            })
        })
        this.post('#/frameClients/create', function (ctx) {

            let name = ctx.params.name

            clientsService
                .createClient(name)
                .then(function (clientInfo) {
                    auth.showInfo('Client Has been created')
                    ctx.redirect('#/frameClients')
                })
                .catch((e) => {
                    console.log(e["responseJSON"]["description"])
                    auth.showError(e["responseJSON"]["description"]);
                })
        })


    }).run()
})
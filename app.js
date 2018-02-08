
$(() => {

    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs')

        this.get('index.html', displayHome)
        this.get('/', displayHome)
        this.get('#/home', displayHome)
        
        function displayHome(ctx) {

            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null
            ctx.username = sessionStorage.getItem('username')

            $.get('https://testproject-f7dc4.firebaseio.com/e.json').then(data => {
                ctx.data = data
                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    object: './templates/home/homeObject.hbs',
                }).then(function () {
                    this.partial('./templates/home/home.hbs').then(function () {
                        let all = $('.ddd')
                        all.click(function (e) {
                            console.log($(e.target).attr('data-in'))
                        })
                    })
                })
            })
        }

        this.get('#/createProduct', function (ctx) {
            ctx.partial('./templates/products/create.hbs')
        })
        this.post('#/createProduct', function (ctx) {
            let widthProduct = ctx.params.widthProduct
            let heightProduct = ctx.params.widthProduct


            // $.post('https://testproject-f7dc4.firebaseio.com/e.json', JSON.stringify({
            //     "width": "1011",
            //     "height": "15"
            // })).then(() => {
            //     console.log('dd')

            //     ctx.redirect('#/home')
            // }).catch(err => {
            //     console.log(err)

            // })
        })

        this.get('#/register', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null
            ctx.username = sessionStorage.getItem('username')

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                registerForm: './templates/register/registerForm.hbs',
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs')

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
                    }).catch(auth.handleError)
            }


        })        

        this.get('#/login', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null
            ctx.username = sessionStorage.getItem('username')
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                loginForm: './templates/login/loginForm.hbs',
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs')

            })
        })
        this.post('#/login', function (ctx) {
            let username = ctx.params.username
            let password = ctx.params.password

            auth.login(username, password)
                .then(function (userinfo) {
                    auth.saveSession(userinfo)
                    auth.showInfo('LOGGED IN')
                    displayHome(ctx)
                }).catch(auth.handleError)
        })        

        this.get('#/logout', function (ctx) {
            auth.logout()
                .then(function () {
                    sessionStorage.clear()
                    auth.showInfo('Logged out')
                    displayHome(ctx)
                }).catch(auth.handleError)
        })



    }).run()
})
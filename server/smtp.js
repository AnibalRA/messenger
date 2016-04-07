Meteor.startup(function () {
    smtp = {
        username: 'registroacademicoufg@gmail.com', // eg: server@gentlenode.com
        password: 'regM41lUFG', // eg: 3eeP1gtizk5eziohfervU
        server: 'smtp.gmail.com'
    }

    process.env.MAIL_URL = 'smtp://' + smtp.username + ':' + smtp.password + '@' + smtp.server + ':587';
    //process.env.MAIL_URL = 'smtp://your_username:your_password@smtp.sendgrid.net:587';
});
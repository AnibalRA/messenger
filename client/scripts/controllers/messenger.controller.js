angular.module("app")

.controller('messengerCtrl', function ($scope, $reactive, $stateParams, userService) {
    $reactive(this).attach($scope);

    let user = userService.usuarioActual();

    this.subscribe('chats');
    let chatId = $stateParams.messengerId;

    this.helpers({
        messages() {
                return Messages.find({
                    chatId: chatId
                })
            },
            data() {
                return Chats.findOne(chatId);
            }
    });


    this.sendMessage = function () {

        if (_.isEmpty(this.message)) return;

        Meteor.call('newMessage', {
            text: this.message,
            // type: 'text',
            chatId: chatId
        });

        delete this.message;
    };

    this.prueba = function () {
            Meteor.call('viewed', chatId);
        }
        /*
        this.subscribe('chats');
        this.helpers({
            data() {
                return Chats.find();
            }
        });

        this.remove = function (chat) {
            Meteor.call('removeChat', chat._id);
        };*/
})
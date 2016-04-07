angular.module("app")

.controller('messengerDetailCtrl', function ($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);
    this.subscribe('chats');
    let chatId = $stateParams.chatId;

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
        console.log(this.message);
        if (_.isEmpty(this.message)) return;

        Meteor.call('newMessage', {
            text: this.message,
            //type: 'text',
            chatId: chatId
        });

        delete this.message;
    }

    this.salir = function () {
        $scope.$emit('to_parent');
    }
})
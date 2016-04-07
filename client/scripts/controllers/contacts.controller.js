angular.module("app")

.controller('contactsCtrl', function ($scope, $reactive, $state) {
    $reactive(this).attach($scope);

    this.subscribe('users');
    this.subscribe('chats');

    this.helpers({
        users() {
            return Meteor.users.find({
                _id: {
                    $ne: Meteor.userId()
                }
            });
        }
    });

    this.newChat = function (userId) {
        var chat = Chats.findOne({
            //            type: 'chat',
            userIds: {
                $all: [Meteor.userId(), userId]
            }
        });

        if (chat) {
            return $state.go("/chat", {
                chatId: chat._id
            });
        }
        console.log("entró");
        Meteor.call('newChat', userId, function (error, result) {
            if (error) {
                console.log(error);
            }
            $state.go("/chat", {
                chatId: result
            });
        });

    };

    this.goToChat = function (chatId) {
        $state.go("/chat", {
            chatId: chatId
        });
    }
});
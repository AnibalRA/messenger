angular.module("app")

.controller('menuCtrl', function ($scope, $reactive, $state, userService) {
    $reactive(this).attach($scope);

    let user = userService.usuarioActual();

    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.color = user.color;
    
    this.lvActive;
    this.private = user.isAdmin;

    Meteor.subscribe('users', user);
    this.subscribe('chats');

    if (user.isAdmin) {
        this.helpers({
            data() {
                return Chats.find();
            }
        });
    }
    this.helpers({
        users() {
            return Meteor.users.find({
                _id: {
                    $ne: Meteor.userId()
                }
            })
        }
    });

    this.chatDetail = function (chatId) {
        var chat = Chats.findOne({
            _id: chatId
        });

        if (chat) {
            return $state.go("/messenger", {
                messengerId: chat._id
            });
        }
    };

    this.newChat = function (userId) {

        var chat = Chats.findOne({
            //type: 'chat',
            userIds: {
                $all: [Meteor.userId(), userId]
            }
        });

        if (chat) {
            return $state.go("/messenger", {
                messengerId: chat._id
            });
        } else {
            Meteor.call('newChat', userId, function (error, result) {
                if (error) {
                    console.log(error);
                }
                $state.go("/messenger", {
                    messengerId: result
                });
            });
        }
    };
})
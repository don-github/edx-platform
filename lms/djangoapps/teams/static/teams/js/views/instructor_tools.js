;(function (define) {
    'use strict';

    define(['backbone',
            'underscore',
            'gettext',
            'teams/js/views/team_utils',
            'common/js/components/utils/view_utils',
            'text!teams/templates/instructor-tools.underscore'],
        function (Backbone, _, gettext, TeamUtils, ViewUtils, instructorToolbarTemplate) {
            return Backbone.View.extend({

                events: {
                    'click .action-delete': 'deleteTeam',
                    'click .action-edit-members': 'editMembership'
                },

                initialize: function(options) {
                    this.template = _.template(instructorToolbarTemplate);
                    this.team = options.team;
                    this.teamEvents = options.teamEvents;
                },

                render: function() {
                    this.$el.html(this.template);
                    return this;
                },

                deleteTeam: function (event) {
                    event.preventDefault();
                    ViewUtils.confirmThenRunOperation(
                        gettext('Delete this team?'),
                        gettext('Deleting a team is permanent and cannot be undone. All members are removed from the team, and team discussions can no longer be accessed.'),
                        gettext('Delete'),
                        _.bind(this.handleDelete, this)
                    );
                },

                editMembership: function (event) {
                    event.preventDefault();
                    alert("You clicked the button!");
                    //placeholder; will route to remove team member page
                },

                handleDelete: function () {
                    var self = this;
                    this.team.destroy().then(function () {
                        self.teamEvents.trigger('teams:update', {
                            action: 'delete',
                            team: self.team
                        });
                        Backbone.history.navigate('topics/' + self.team.get('topic_id'), {trigger: true});
                    });
                }
            });
        });
}).call(this, define || RequireJS.define);

Template.kbzs.helpers({
  kbzs  : function() {
    return Kbz.find({});                                        
    }
});
  
Template.kbzsrow.helpers({
  kbzsDashPath: function() {
    Session.set('current_kbz_id', this._id);
    Session.set('current_membership',Members.findOne({kbz_id : Session.get('current_kbz_id') ,user_id : Meteor.userId()}));
    return Router.routes.allProposals.path({_id: this._id});
  }
});
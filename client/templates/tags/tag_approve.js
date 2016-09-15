Template.tagApprove.helpers({
  tags: function(){
    console.log(this.name);
    return Tags.find();
  }
});

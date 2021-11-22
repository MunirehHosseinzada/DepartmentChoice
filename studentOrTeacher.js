// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function studentForm(){
	Alloy.createController('studentSignUp').getView().open();
}

function teacherForm(){
	Alloy.createController('teacherSignUp').getView().open();
}

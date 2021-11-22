// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var Cloud = require('ti.cloud');
var name = '';
var last_name = '';
var email = '';
var password = '';
var password_confirm = '';
var department = '';
var ID = '';
var owner_id = '';
var rule = 0;

function netClicked() {
	department = 'network';
	$.chizOne.backgroundColor = '#27b8b0';
	$.chizTwo.backgroundColor = 'white';
	$.chizThree.backgroundColor = 'white';
	// alert(department);
}

function softClicked() {
	department = 'software';
	$.chizOne.backgroundColor = 'white';
	$.chizTwo.backgroundColor = '#27b8b0';
	$.chizThree.backgroundColor = 'white';
	// alert(department);
}

function dataClicked() {
	department = 'database';
	$.chizOne.backgroundColor = 'white';
	$.chizTwo.backgroundColor = 'white';
	$.chizThree.backgroundColor = '#27b8b0';
	// alert(department);
}

function createUser() {

	name = $.firstName.value;
	last_name = $.lastName.value;
	email = $.email.value;
	password = $.password.value;
	password_confirm = $.password_confirmation.value;

	Cloud.Users.create({
		email : email,
		first_name : name,
		last_name : last_name,
		password : password,
		password_confirmation : password_confirm
	}, function(e) {
		if (e.success) {
			var user = e.users[0];
			Ti.App.Properties.setString('teacherObjId', user.id);
			loginMe();

		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});

}

function loginMe() {

	email = $.email.value;
	password = $.password.value;

	Cloud.Users.login({
		login : email,
		password : password
	}, function(e) {
		if (e.success) {
			var user = e.users[0];

			GetID();

			Ti.App.Properties.setObject('user', user);
			Ti.App.Properties.setString('email', email);
			Ti.App.Properties.setString('password', password);
			Ti.App.fireEvent('user_logged_in');
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});

}

function GetID() {

	Cloud.Users.showMe(function(e) {
		if (e.success) {
			var user = e.users[0];
			// alert('id: ' + user.id);
			ID = user.id;
			createTeacher();
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});

}

function createTeacher() {

	Cloud.Objects.create({
		classname : "teachers",
		su_id : ID,
		fields : {
			name : name,
			last_name : last_name,
			department : department,
			email : email,
			password : password,
			owner_id : ID,
			rule : 1,
			full_name : name + " " + last_name
		}
	}, function(e) {
		if (e.success) {
			var teacher = e.teachers[0];

			var window_to_close = $.teacherSignUp;
			var window_to_open = 'teacherHome';

			if (window_to_open != null) {
				Alloy.createController(window_to_open).getView().open();
			}
			if (window_to_close != null) {
				window_to_close.close();
			}

		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});

	name = '';
	last_name = '';
	email = '';
	password = '';
	password_confirm = '';
	department = '';
	ID = '';
	rule = 0;

}

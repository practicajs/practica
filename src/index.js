const npmUser = require("npm-user");

(async () => {
  console.log(await npmUser("madai"));
  /*
	{
		name: 'Sindre Sorhus',
		avatar: 'https://gravatar.com/avatar/d36a92237c75c5337c17b60d90686bf9?size=496',
		email: 'sindresorhus@gmail.com',
		github: 'sindresorhus',
		twitter: 'sindresorhus'
	}
	*/
})();

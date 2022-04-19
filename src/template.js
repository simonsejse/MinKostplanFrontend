Velkommen til Min Side

const Bruger = {
  id: 1,
  brugernavn: 'simonsejse',
  email: 'simonwa01@gmail.com',
};

export const sider = {
  mig: () => {
  	console.log('Du er her');
  },
  hjem: () => {
    naviger('Klik her for at komme til hjem');
  },
  logud: () => {
    naviger('Klik her for at logge ud');
  },
};

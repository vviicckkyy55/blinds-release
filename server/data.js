import bcrypt from 'bcryptjs';

const data = {

    users: [
      {
        name: "vicky",
        email: "vviicckkyy55@gmail.com",
        password: bcrypt.hashSync('toomuchfun', 8),
        isAdmin: true,
        isMaster: true,
        master: {
          name: "Paprika",
          logo: 'images/logo.png',
          description: 'good master',
          rating: 4.5 ,
          numReviews: 111,
        },
      },
      {
        name: "vinciis",
        email: "vinciis2018@gmail.com",
        password: bcrypt.hashSync('toomuchfun', 8),
        isAdmin: false,
        isMaster: false,
      },
    ],

    screens:[
      {
        name: 'Paprika Screen',
        image: '../images/v1.png',
        category: 'DOOH Screen',
        slotsAvailable: 7,
        costPerSlot: '100',
        rating: 4.0,
        numReviews: '21',
        description: "Quality Screen for advertising",
      },
      {
        name: 'Sigra Screen',
        image: '../images/v2.png',
        category: 'DOOH Screen',
        slotsAvailable: 10,
        costPerSlot: '100',
        rating: 2,
        numReviews: '4',
        description: "Quality Screen for advertising",
      },
      {
        name: 'Cantt screen',
        image: '../images/v3.png',
        category: 'Venetian Screen',
        slotsAvailable: 0,
        costPerSlot: '50',
        rating: 3.5,
        numReviews: '59',
        description: "Quality Screen for advertising",
      },
      {
        name: 'BHU screen',
        image: '../images/v4.png',
        category: 'DOOH Screen',
        slotsAvailable: 56,
        costPerSlot: '100',
        rating: 4,
        numReviews: '21',
        description: "Quality Screen for advertising",
      },
      {
        name: 'V2 screen',
        image: '../images/v1.png',
        category: 'Venetian Screen',
        slotsAvailable: 0,
        costPerSlot: '300',
        rating: 0,
        numReviews: '0',
        description: "Quality Screen for advertising",
      },
      {
        name: 'IP screen',
        image: '../images/v3.png',
        category: 'Venetian Screen',
        slotsAvailable: 100,
        costPerSlot: '150',
        rating: 5,
        numReviews: '251',
        description: "Quality Screen for advertising",
      },
    ],
  };
  
  export default data;
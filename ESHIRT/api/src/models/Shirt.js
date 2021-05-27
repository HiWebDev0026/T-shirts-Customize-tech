const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('shirt', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    size: {
      type: DataTypes.ENUM('S', 'M', 'L', 'XL', 'XXL'),
      allowNull: true,
    },
    print: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      get() {
        
        return this.getDataValue('price')
      },
      set (value) {
        if(this.getDataValue('discount') !== null) {
        let weekDay = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(new Date());
        let checkDiscountDay = this.getDataValue('discount').slice(0, this.getDataValue('discount').indexOf('-')) === weekDay;
        
        let newPrice = value - (Math.ceil(value*(parseInt(this.getDataValue('discount').split('/')[1])/100)));
     /*    console.log('----------')
        console.log(value*(parseInt(this.getDataValue('discount').split('/')[1])/100))
        console.log(value - (parseInt(this.getDataValue('discount').split('/')[1])/100))
        console.log(parseInt(this.getDataValue('discount').split('/')[1]) + value)
        console.log(value)
        console.log(checkDiscountDay)
        console.log(newPrice);
        console.log(this.getDataValue('discount'))
        console.log('----------') */
        return checkDiscountDay ? this.setDataValue('price', newPrice) : this.setDataValue('price', value)
        } else {
          return this.setDataValue('price', value);
        }
      }
    },
    // print: {
    //   type: DataTypes.BLOB('long'),
    //   allowNull: true,
    //   // validate: {
    //   //   isUrl: true
    //   // }
    // },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    public: {
      type: DataTypes.ENUM("pending", "true", "false"),
      allowNull: false,
      
    },
    created_by_user: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    discount: { // will be set by user
      type: DataTypes.STRING, /*     Thursday-Categoria/20     */
      allowNull: true,
      defaultValue: null,
    }
  });
};


/* testeando GIT PUSH  */
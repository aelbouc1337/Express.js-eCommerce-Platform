const emailjs = require('@emailjs/nodejs');

exports.mailjs = (email , username) => {
    const params = {
        to_name : username,
        email : email,
        from_name : 'myApp',
        message : 'hello and welcome',
    }
    emailjs.init({
        publicKey: "FqgESUsKwXLeKORB1",
      });
    
    emailjs.send('service_oq4q3fm', 'template_jrsjzih',params)
    .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
    (err) => {
          console.log('FAILED...', err);
        },
      );
}

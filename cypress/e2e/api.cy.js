/// <reference types= "cypress" />



describe('api testing', () => {
  const randomISBN = Math.floor(Math.random() * 1442)
  const randomAISLE = Math.floor(Math.random() * 1442)
  let firstNames = [
    'John',
    'Emma',
    'Michael',
    'Sophia',
    'William',
    'Olivia',
    'James',
    'Ava',
    'Alexander',
    'Isabella',

  ];
  let RandomfirstNames = Math.floor(Math.random() * firstNames.length)



  let lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Jones',
    'Brown',
    'Davis',
    'Miller',
    'Wilson',
    'Moore',
    'Taylor',

  ];

  let RandomlastNames = Math.floor(Math.random() * lastNames.length)
  it('test post method', () => {

    const requestbody = {

      name: "Qa private Zoom",
      isbn: randomISBN,
      aisle: randomAISLE,
      author: firstNames[RandomfirstNames] + " " + lastNames[RandomlastNames]

    }

    cy.request({
      method: "POST",
      url: "https://rahulshettyacademy.com/Library/Addbook.php",
      body: requestbody
    }).then((Response) => {
      cy.log(Response.status)
      cy.log(Response.body)
      expect(Response.status).to.eq(200)
      expect(Response.body.Msg).to.eq("successfully added")
    })
  })
  it('test get method', () => {
    cy.request({
      method: "GET",
      url: `https://rahulshettyacademy.com/Library/GetBook.php?ID=${randomISBN}${randomAISLE}`,
    }).then((Response) => {
      cy.log(Response.status)
      cy.log(Response.body)
      expect(Response.status).to.eq(200)
      cy.log(Response.body[0].author)
      expect(Response.body[0].author).to.eq(`${firstNames[RandomfirstNames]} ${lastNames[RandomlastNames]}`)

    })
  });
  it('test delete method', () => {

    const requestbody = {
      ID: `${randomISBN}${randomAISLE}`,
    }


    cy.request({
      method: "DELETE",
      url: "https://rahulshettyacademy.com/Library/DeleteBook.php",
      body: requestbody
    }).then((Response) => {
      expect(Response.status).to.eq(200)
      expect(Response.body.msg).to.eq("book is successfully deleted")
    })
  })
})


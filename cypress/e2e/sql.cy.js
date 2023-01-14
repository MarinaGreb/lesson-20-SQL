describe("connect to test db", () => {
  it("can connect to the db", () => {
    cy.task(
      "queryDb",
      "CREATE TABLE Students (StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))"
    );
  });

  it("Input entries", () => {
    cy.task("queryDb", 
    `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES      
      (1, "Ira", "02-2022", "Rome"), 
      (2, "Mira", "03-2022", "Omsk"), 
      (3, "Kira", "02-2023", "Krakow");`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.equal(3);
    });
  });

  it('Select ', () => {
    cy.task("queryDb", `SELECT FirstName FROM Students WHERE City="Omsk"`)
    .then((result) => {
      cy.log(JSON.stringify(result));
      expect(result[0].FirstName).to.equal("Mira");

    })
  });

  it("Add data", () => {
    cy.task("queryDb", 
    `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES      
      (4, "Tor", "02-2022", "Milan"), 
      (5, "Sir", "02-2022", "Loo")`, 
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.equal(2);
    });
  });

  it('Display all students from 1st group', () => {
    cy.task("queryDb", `SELECT FirstName FROM Students WHERE StudentGroup="02-2022"`)
    .then((result) => {
      cy.log(JSON.stringify(result));
      result.forEach(result => {
        cy.log(result.FirstName);
      });
      expect(result).to.have.lengthOf(3)
    })
  });

  it("can delete the db", () => {
    cy.task("queryDb", "DROP TABLE Students");
  });
});

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("OrgTable")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("OrgTable").insert([
        {
          org_name: "rowValue1",
          email: "rowValue1",
          password: "rowValue1",
          sms: "rowValue1",
          isAdmin: false
        },
        {
          org_name: "rowValue2",
          email: "rowValue2",
          password: "rowValue2",
          sms: "rowValue2",
          isAdmin: false
        },
        {
          org_name: "rowValue3",
          email: "rowValue3",
          password: "rowValue3",
          sms: "rowValue3",
          isAdmin: true
        },
        {
          org_name: "rowValue4",
          email: "rowValue4",
          password: "rowValue4",
          sms: "rowValue4",
          isAdmin: true
        }
      ]);
    });
};

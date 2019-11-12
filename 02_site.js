const Prismic = require("prismic-javascript");
const db = require("./database/dbConfig");
const prismicURL = "https://welldone-dashboard.cdn.prismic.io/api/v2";

// * GET SITE *
const getSite = async function() {
  try {
    const api = await Prismic.getApi(prismicURL);
    const result = await api.query([
      Prismic.Predicates.at("document.type", "village")
    ]);
    site(result.results);
  } catch (error) {
    console.log({ getSite_fail: error.message });
  }
};
getSite();

// * SITE SEED *
const site = function(site) {
  for (let i = 0; i < site.length; i++) {
    let SiteSeed = {
      uid_site: site[i].id,
      village: site[i].data.village,
      commune: site[i].data.commune,
      district: site[i].data.district,
      province: site[i].data.province
    };
    //console.log(SiteSeed);
    addSiteSeed(SiteSeed);
  }
};

// * ADD SITE SEED *
function addSiteSeed(SiteSeed) {
  return (
    db("SiteTable")
      .insert(SiteSeed)
      //.returning("id")
      .then(res => {
        console.log("addSiteSeed_success |", res);
      })
      .catch(error => {
        console.log({ addSiteSeed_fail: error.message });
      })
  );
}

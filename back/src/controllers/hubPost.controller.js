const { pool, numeroHash } = require("../database");
const { TOKEN_ACCESS } = require("../keys");
const hubSpot = require("@hubspot/api-client");
const hubSpotClient = new hubSpot.Client({ accessToken: TOKEN_ACCESS });
var http = require("https");

/* -------------------------------------------------------------------------- */
/*                         LISTAR CLIENTES DE HUBSPOT                         */
/* -------------------------------------------------------------------------- */
/* ------------ Este metodo escanea y actualiza la DB de clientes ----------- */

async function listClient(req, res) {
  try {
    // const limit = 100;
    // let after = undefined;
    // const properties = undefined;
    // const propertiesWithHistory = undefined;
    // const associations = undefined;
    // const archived = false;

    let dataAllClients = await hubSpotClient.crm.contacts.getAll(
      undefined,
      undefined,
      ["hs_object_id", "firstname", "lastname", "email", "company", "website"],
      undefined,
      ["companies"]
    );

    console.log(dataAllClients[0].properties);

    dataAllClients
      .filter((client) => {
        let { firstname, lastname, email } = client.properties;
        if (firstname || lastname || email) return client;
      })
      .map(async (client) => {
        let { hs_object_id, firstname, lastname, email, company, website } =
          client.properties;
        if (firstname == "Artur") console.log(client.properties);
        const dataClient = `UPDATE "Clients" SET "firstName"='${firstname}', "firstLastName"='${lastname}', "email"='${email}', "idHubPost"='${hs_object_id}', "company"='${company}', "website"='${website}' WHERE "idHubPost"='${hs_object_id}';`;
        await pool.query(dataClient);
      });

    res.status(200).json("Migracion Exitosa");
  } catch (error) {
    console.log(error);
  }
}

async function updateClient(req, res) {
  try {
    const limit = 100;
    let after = undefined;
    const properties = undefined;
    const propertiesWithHistory = undefined;
    const associations = undefined;
    const archived = false;

    let dataAllClients = [];

    do {
      let response = await hubSpotClient.crm.contacts.basicApi.getPage(
        limit,
        after,
        properties,
        propertiesWithHistory,
        associations,
        archived
      );
      dataAllClients = [...dataAllClients, ...response.results];
      after = response.paging?.next?.after;
    } while (after);

    let dataClients = [];

    dataAllClients
      .filter((client) => {
        let { firstname, lastname, email } = client.properties;
        if (firstname || lastname || email) return client;
      })
      .map((client) => {
        let { hs_object_id, firstname, lastname, email, company, website } =
          client.properties;
        dataClients.push(
          `('${firstname}', '${lastname}', '${email}', '${hs_object_id}', '${company}', '${website}')`
        );
      });
    dataClients = dataClients + ";";

    let clientsInsert = await pool.query(
      `INSERT INTO "Clients" ("firstName", "firstLastName", "email", "idHubPost", "company", "website") VALUES ${dataClients}`
    );
    console.info(
      `Se han migrado exitosamente ${clientsInsert.rowCount} cuentas desde hubPost hacía nuestra base de datos.`
    );

    res.status(200).json("Migracion Exitosa");
  } catch (error) {
    console.log(error);
  }
}

/*const listClient = async (req, res) => {
  const limit = 100;
  const after = undefined;
  const properties = undefined;
  const propertiesWithHistory = undefined;
  const associations = undefined;
  const archived = false;

  // const response = await pool.query(`SELECT * FROM "Clients"`);
  // let clientsDB = response.rows;
  // let array = new Array();
  // clientsDB.forEach((data) => {
  //   array.push(data.idHubPost);
  // });
  try {
    const apiResponse = await hubspotClient.crm.contacts.basicApi.getPage(
      limit,
      after,
      properties,
      propertiesWithHistory,
      associations,
      archived
    );
    apiResponse.results.map(async (data) => {
      // if (array.find((element) => element === data.id)) {
      // await pool.query(
      //   `INSERT INTO "Clients"("firstName", "firstLastName", "company", "email", "phone", "website", "idHubPost")
//     VALUES($1, $2, $3, $4, $5, $6, $7)`,
//   [
//     data?.properties?.firstname,
//     data?.properties?.lastname,
//     data?.properties?.company,
//     data?.properties?.email,
//     data?.properties?.phone,
//     data?.properties?.website,
//     data?.id,
//   ]
// );
// } else {
//   console.log(
//     `El cliente ${data.properties.firstname} ya esta registrado`
//   );
// }
// console.log(data);
res.status(200).json("DB clientes Actualizada");
    });
console.log(apiResponse.results.length);
  } catch (e) {
  e.message === "HTTP request failed"
    ? console.error(JSON.stringify(e.response, null, 2))
    : console.error(e);
  res.status(400).json(JSON.stringify(e.response, null, 2));
}
};* /

/* -------------------------------------------------------------------------- */
/*                       CREACION DE CLIENTE  A HUBPOST                       */
/* -------------------------------------------------------------------------- */
/* --------------- CREA DIRECTAMENTE A LOS CLIENTES AL HUBPOST -------------- */

// const createClient = async (req, res) => {
//   const { company, email, firstname, lastname, phone, website } = req.body;
//   const properties = {
//     company,
//     email,
//     firstname,
//     lastname,
//     phone,
//     website,
//   };
//   const SimplePublicObjectInput = { properties };
//   try {
//     const apiResponse = await hubspotClient.crm.contacts.basicApi.create(
//       SimplePublicObjectInput
//     );
//     console.log(JSON.stringify(apiResponse.body, null, 2));
//   } catch (e) {
//     e.message === "HTTP request failed"
//       ? console.error(JSON.stringify(e.response, null, 2))
//       : console.error(e);
//   }
// };

/* -------------------------------------------------------------------------- */
/*                   LISTA TODAS LAS COTIZACIONES DE HUBSPOT                  */
/* -------------------------------------------------------------------------- */
/* -------- Lista las cotizacion y las acutaliza directamente a la DB ------- */
const listQuotes = async (req, res) => {
  try {
    const limit = 100;
    const after = undefined;
    const properties = undefined;
    const propertiesWithHistory = undefined;
    const associations = undefined;
    const archived = false;

    /* -------------- BUSCA EN LA DB SI NO HAY UNA COTIZACION IGUAL ------------- */
    const response = await pool.query(`SELECT * FROM "Quotes"`);
    let clientsDB = response.rows;
    let array = new Array();
    clientsDB.forEach((data) => {
      array.push(data.quoteNumber);
    });

    const apiResponse = await hubspotClient.crm.quotes.basicApi.getPage(
      limit,
      after,
      properties,
      propertiesWithHistory,
      associations,
      archived
    );
    apiResponse.results.forEach(async (data) => {
      // if (array.find((element) => element === data.properties.quoteNumber)) {
      // await pool.query(
      //   `INSERT INTO "Quotes" ("title", "hubspotOwnerId", "terms", "quoteNumber",
      //   "quoteAmount", "status", "createDate", "expirationDate")
      //   VALUES($1, $2, $3, $4, $5, $6, $7)`,
      //   [
      //     data.properties.hs_title,
      //     data.properties.hubspot_owner_id,
      //     data.properties.hs_terms,
      //     data.properties.hs_quote_number,
      //     data.properties.hs_quote_amount,
      //     data.properties.hs_status,
      //     data.properties.hs_createdate,
      //     data.properties.hs_expiration_date,
      //   ]
      // );
      console.log(data, "data prorp");
      // } else {
      //   console.log(
      //     `El cliente ${data.properties.firstname} ya esta registrado`
      //   );
      // }
      res.status(200).json("DB clientes Actualizada");
    });
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};

const listDeal = async () => {
  try {
    const limit = 10;
    const after = undefined;
    const properties = undefined;
    const propertiesWithHistory = undefined;
    const associations = undefined;
    const archived = false;

    const apiResponse = await hubspotClient.crm.deals.basicApi.getPage(
      limit,
      after,
      properties,
      propertiesWithHistory,
      associations,
      archived
    );
    const apiResponse2 = await hubspotClient.crm.properties.coreApi.getAll(
      objectType,
      archived
    );
    apiResponse.results.forEach(async (data) => {
      console.log(data, "data prorp");
    });
    // console.log(JSON.stringify(apiResponse.body, null, 2));
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};

const listProperties = async (req, res) => {
  try {
    const BatchInputPublicAssociation = {
      inputs: [
        {
          from: { id: "101" },
          to: { id: "53733497" },
          type: "contact_to_company",
        },
      ],
    };
    const fromObjectType = "fromObjectType";
    const toObjectType = "toObjectType";

    const apiResponse = await hubspotClient.crm.associations.batchApi.archive(
      fromObjectType,
      toObjectType,
      BatchInputPublicAssociation
    );
    apiResponse.results.forEach(async (data) => {
      console.log(data, "data prorp");
      res.status(200).json("prop");
    });
  } catch (e) {
    e.message === "HTTP request failed";
    // ? console.error(JSON.stringify(e.response, null, 2))
    // : console.error(e);
    res.status(400).json(e.message);
  }
};

const createQuote = async (req, res) => {
  try {
    const {
      property_string,
      property_number,
      property_date,
      property_radio,
      property_dropdown,
      property_checkbox,
      property_multiple_checkboxes,
    } = req.body;

    const properties = {
      property_string,
      property_number,
      property_date,
      property_radio,
      property_dropdown,
      property_checkbox,
      property_multiple_checkboxes,
    };
    const SimplePublicObjectInput = { properties };

    const apiResponse = await hubspotClient.crm.quotes.basicApi.create(
      SimplePublicObjectInput
    );
    console.log(JSON.stringify(apiResponse.body, null, 2));
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};

async function sendEmail(params) {
  try {
    var options = {
      method: "POST",
      hostname: "api.hubapi.com",
      port: null,
      path: "/crm/v3/objects/emails",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: { TOKEN_ACCESS },
      },
    };

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });

    req.write(
      JSON.stringify({
        properties: {
          hs_timestamp: "2019-10-30T03:30:17.883Z",
          hubspot_owner_id: "11349275740",
          hs_email_direction: "christgg1997@gmail.com",
          hs_email_sender_email: "SalesPerson@hubspot.com",
          hs_email_sender_firstname: "Francis",
          hs_email_sender_lastname: "Seller",
          hs_email_to_email: "bh@biglytics.com",
          hs_email_to_firstname: "Brian",
          hs_email_to_lastname: "Buyer",
          hs_email_status: "SENT",
          hs_email_subject: "Let's talk",
          hs_email_text:
            "Thanks for taking your interest let's find a time to connect",
        },
      })
    );
    req.end();
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listClient,
  // createClient,
  updateClient,
  listQuotes,
  createQuote,
  listDeal,
  listProperties,
  sendEmail,
};

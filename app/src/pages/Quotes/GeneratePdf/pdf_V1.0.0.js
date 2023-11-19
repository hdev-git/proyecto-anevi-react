import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import Logotype from "../../../images/Cliente/Logotipo_color_bnzero1.png";
import { formatDate } from "../../../utils/tools";

function PDF({
  dataClient,
  dataProject,
  dataProducts,
  dataOwner,
  termsAndConditions,
}) {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            padding: 10,
          }}
        >
          <Image
            src={Logotype}
            alt="Logo"
            style={{ maxWidth: "100px", maxHeight: "40" }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Text style={{ color: "#3388af", fontSize: "12px" }}>
              {formatDate(dataProject.createDate)}
            </Text>
          </View>
        </View>
        <hr
          style={{
            height: "3px",
            backgroundColor: "#00D1C2",
            marginLeft: "10px",
            marginRight: "10px",
          }}
          // className="degradiant"
        />

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
            backgroundColor: "white",
            padding: 10,
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <Text style={{ color: "#3388af", fontSize: "16px" }}>
            {dataProject.title}
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
              padding: 10,
            }}
          >
            <View>
              <Text
                style={{
                  color: "#DCDBDA",
                  fontStyle: "italic",
                  fontSize: "10px",
                }}
              >
                {dataClient.firstName} {dataClient.firstLastName}
              </Text>
              <Text
                style={{
                  color: "#DCDBDA",
                  fontStyle: "italic",
                  fontSize: "10px",
                }}
              >
                {
                  //dataProject.hubspotOwnerId
                }
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  color: "#DCDBDA",
                  fontStyle: "italic",
                  fontSize: "10px",
                }}
              >
                {dataProject.reference}
              </Text>
              <Text
                style={{
                  color: "#DCDBDA",
                  fontStyle: "italic",
                  fontSize: "10px",
                }}
              >
                {dataProject.review}
              </Text>
            </View>
          </View>

          <Text
            style={{
              color: "gray",
              textAlign: "justify",
              fontStyle: "italic",
              fontSize: "10px",
              marginTop: "22px",
            }}
          >
            {dataProject.description}
          </Text>
          <View style={{ width: "100%" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: 8,
                paddingBottom: 8,
                borderTop: "none",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              <Text
                style={{
                  width: "65%",
                  fontSize: "8px",
                  color: "#B6B4B4",
                }}
              >
                Conceptos
              </Text>
              <Text
                style={{
                  width: "5%",
                  fontSize: "8px",
                  color: "#B6B4B4",
                }}
              >
                Cantidad
              </Text>
              <Text
                style={{
                  width: "10%",
                  fontSize: "8px",
                  color: "#B6B4B4",
                }}
              >
                Precio
              </Text>
              <Text
                style={{
                  width: "10%",
                  fontSize: "8px",
                  color: "#B6B4B4",
                }}
              >
                Descuento
              </Text>
              <Text
                style={{
                  width: "10%",
                  fontSize: "8px",
                  color: "#B6B4B4",
                }}
              >
                Total
              </Text>
            </View>
            {dataProject.data.map((fee, index) => (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderTop: "1px solid #EEE",
                  paddingTop: 8,
                  paddingBottom: 8,
                }}
                wrap={false}
              >
                <Text
                  style={{
                    width: "65%",
                    fontSize: "8px",
                    color: "#CBCBCB",
                  }}
                >
                  {dataProducts[fee.concept].title}
                </Text>
                <Text
                  style={{
                    width: "5%",
                    fontSize: "8px",
                    color: "#CBCBCB",
                  }}
                >
                  {fee.unit}
                </Text>
                <Text
                  style={{
                    width: "10%",
                    fontSize: "8px",
                    color: "#CBCBCB",
                  }}
                >
                  {fee.price}
                </Text>
                <Text
                  style={{
                    width: "10%",
                    fontSize: "8px",
                    color: "#CBCBCB",
                  }}
                >
                  {fee.discount}
                </Text>
                <Text
                  style={{
                    width: "10%",
                    fontSize: "8px",
                    color: "#CBCBCB",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>{fee.imported}</Text>
                </Text>
              </View>
            ))}
            <Text
              style={{
                marginLeft: "90%",
                width: "10%",
                fontSize: "8px",
                color: "#CBCBCB",
              }}
            >
              {dataProject.price}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PDF;

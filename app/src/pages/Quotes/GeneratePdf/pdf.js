/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";

import { Document, Page, Text, View, Image, Font } from "@react-pdf/renderer";

import BackgroundPdf from "../../../images/pdf/BackgroundPdf.png";
import BackgroundEnd from "../../../images/pdf/BackgroundEnd.png";
import FooterPdf from "../../../images/pdf/FooterPdf.png";
import lineaDegradadaPdf from "../../../images/pdf/lineaDegradadaPdf.png";
import Logotype from "../../../images/pdf/LogoBnzeroPdf.png";

import { formatDate } from "../../../utils/tools";
import { getFees } from "../../../services/Quotes.service";
import { getScopes, getConcepts } from "../../../services/Admin.service";
import GothamLight from "../../../fonts/Gotham-Font/GothamMedium.ttf";
import { getCover } from "../../../services/Admin.service";
import moment from "moment";

function PDF({
  dataClient = {},
  dataProject = {},
  dataProducts = {},
  dataOwner = {},
  dataFees = [],
  termsAndConditions = [],
}) {
  function convertToRoman(num) {
    var roman = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    };
    var str = "";

    for (var i of Object.keys(roman)) {
      var q = Math.floor(num / roman[i]);
      num -= q * roman[i];
      str += i.repeat(q);
    }

    return str;
  }

  let [loading, setLoading] = useState(false);
  let [fees, setFees] = useState([]);
  let [scope, setScope] = useState();
  let [concept, setConcept] = useState();
  let [totalPrice, setTotalPrice] = useState(0);
  let [totalIVA, setTotalIVA] = useState(0);
  let [total, setTotal] = useState(0);
  let [backgroundSrcPT, setBackgroundSrcPT] = useState(null);
  let [backgroundSrcCP, setBackgroundSrcCP] = useState(null);
  useEffect(() => {
    _getdata();
  }, []);

  function getNumbersInString(string) {
    if(String(string).length > 0 && typeof string === "string"){
      var tmp = string.split("");
      var map = tmp.map(function(current) {
        if (!isNaN(parseInt(current))) {
          return current;
        }
      });
    
      var numbers = map.filter(function(value) {
        return value != undefined;
      });
    
      return numbers.join("");
    }else return string;
  }

  async function _getdata() {
    
    let arrayTemp = [];
    dataProducts.map((res) => {
      // eslint-disable-next-line array-callback-return
      dataFees.map((res2) => {
        if (res.ref === res2.reference) {
          arrayTemp.push({
            id: res.id,
            ...res,
            ...res2,
            CONCEPTOS: res.concept,
            REF: res.ref,
            MESES: getNumbersInString(res2.duration),
            UNIDAD: res2.unit,
            VALOR: getNumbersInString(res2.price),
            DESCUENTO: getNumbersInString(res2.discount),
            IVA: Number(res2.imported * 0.16).toFixed(2),
            TOTAL: Number(res2.imported + Number(res2.imported * 0.16)).toFixed(2),
            PAGO: res2.billing,
          });
        }
      });
      let sumPrice = 0;
      for (let i = 0; i < arrayTemp.length; i++) {
        sumPrice += parseInt(arrayTemp[i].VALOR);
      }
      let sumIVA = 0;
      for (let i = 0; i < arrayTemp.length; i++) {
        sumIVA += parseInt(arrayTemp[i].IVA);
      }
      let sumTotal = 0;
      for (let i = 0; i < arrayTemp.length; i++) {
        sumTotal += parseInt(arrayTemp[i].TOTAL);
      }
      setTotalPrice(sumPrice);
      setTotalIVA(sumIVA);
      setTotal(sumTotal);
      setFees(arrayTemp);
    });
    
    await getScopes().then((data) => {
      setScope(data.data);
    });
    await getConcepts().then((data) => {
      setConcept(data.data);
    });

    await getCover().then((data) => {
      data.data.map((res) => {
        if (res.active === true && res.type === "pt") {
          toDataUrl(
            "https://bnzeroapp.com/api" + res?.url.replace("./", "/"),
            function (myBase64) {
              setBackgroundSrcPT(myBase64);
            }
          );
        }
        if (res.active === true && res.type === "c-p") {
          toDataUrl(
            "https://bnzeroapp.com/api" + res?.url.replace("./", "/"),
            function (myBase64) {
              setBackgroundSrcCP(myBase64);
            }
          );
        }
        setLoading(true);
      });
    });
  }

  function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  Font.register({
    family: "Gotham",
    src: GothamLight,
  });

  return (
    loading && (
      <Document>
        {/* -------------------------------- PAGINA 1 -------------------------------- */}
        <Page
          size="A4"
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              fontFamily: "Gotham",
            }}
          >
            {backgroundSrcPT ? (
              <Image
                src={backgroundSrcPT}
                style={{
                  position: "absolute",
                  height: "100vh",
                  width: "100%",
                  objectFit: "cover",
                  zIndex: 0,
                }}
              />
            ) : (
              <Image
                src={BackgroundPdf}
                style={{
                  objectFit: "cover",
                  position: "absolute",
                  zIndex: 0,
                }}
              />
            )}
            <View
              style={{
                marginTop: 50,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: "5%",
              }}
            >
              <Image src={Logotype} alt="Logo" style={{ width: "350px" }} />
              <Text style={{ fontSize: 12, color: "gray", marginTop: 20 }}>
                Creando un proyecto común para un cambio posible
              </Text>
            </View>

            <View
              style={{
                marginTop: 50,
                marginLeft: "60%",
                paddingHorizontal: "5%",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "gray",
                  marginBottom: 20,
                  textAlign: "right",
                  color: "#004750",
                }}
              >
                {moment().format("MMM DD")} | {moment().format("YYYY")}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "gray",
                  marginBottom: 20,
                  textAlign: "right",
                  color: "#004750",
                }}
              >
                Proyecto
              </Text>
            </View>

            <View
              style={{
                paddingVertical: 30,
                paddingHorizontal: 30,
                marginTop: 15,
                backgroundColor: "white",
                opacity: 0.4,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 20,
                    opacity: 1,
                    color: "#7B7B7B",
                  }}
                >
                  PRESUPUESTO
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    marginBottom: 15,
                    opacity: 1,
                    color: "#4E4E4E",
                  }}
                >
                  APOYO DOCUMENTACIÓN -{" "}
                  <Text style={{ fontSize: 12, opacity: 1, color: "#7B7B7B" }}>
                    {dataProject?.title}
                  </Text>
                </Text>
              </View>

              <View>
                <Image
                  src={lineaDegradadaPdf}
                  alt="Logo"
                  style={{ width: "100%", marginBottom: 20, opacity: 1 }}
                />
              </View>

              <View
                style={
                  {
                    // display: "flex",
                    // flexDirection: "row",
                    // justifyContent: "center",
                    // alignItems: "center",
                  }
                }
              >
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: "#004750",
                      marginBottom: 20,
                      marginTop: 20,
                      opacity: 1,
                    }}
                  >
                    Dirigido a:
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#7B7B7B",
                      marginBottom: 20,
                      opacity: 1,
                    }}
                  >
                    {dataClient.firstName} {dataClient.firstLastName}
                  </Text>
                </View>

                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: "#004750",
                      marginBottom: 20,
                      marginTop: 20,
                      opacity: 1,
                    }}
                  >
                    Elaborado por:
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#7B7B7B",
                      marginBottom: 20,
                      opacity: 1,
                    }}
                  >
                    {dataOwner?.firstName || "No data"}{" "}
                    {dataOwner?.lastName || "No data"}
                  </Text>
                </View>

                {/* <View style={{}}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: "#4E4E4E",
                      marginBottom: 20,
                      marginTop: 20,
                      opacity: 1,
                    }}
                  >
                    Guadalajara, Jalisco, México
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#7B7B7B",
                      marginBottom: 20,
                      opacity: 1,
                    }}
                  >
                    {formatDate(dataProject.createDate)}
                  </Text>
                </View> */}
              </View>
            </View>

            <View
              style={{
                marginTop: 200,
                marginLeft: "60%",
                paddingHorizontal: "5%",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "gray",
                  marginBottom: 20,
                  textAlign: "right",
                  color: "#7B7B7B",
                }}
              >
                Oficinas
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "gray",
                  marginBottom: 20,
                  textAlign: "right",
                  color: "#7B7B7B",
                }}
              >
                {dataProject?.location}
              </Text>
            </View>
          </View>
        </Page>

        {/* -------------------------------- PAGINA 2 -------------------------------- */}
        <Page
          size="A4"
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: 50,
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              fontFamily: "Gotham",
              marginHorizontal: "5%",
              marginBottom: 220,
            }}
          >
            {/* --------------------------------- HEADER --------------------------------- */}
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  src={Logotype}
                  alt="Logo"
                  style={{ width: 100, marginBottom: 20, opacity: 1 }}
                />
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "gray",
                      marginBottom: 20,
                      textAlign: "right",
                      color: "#004750",
                    }}
                  >
                    {moment().format("MMM DD")} | {moment().format("YYYY")}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "gray",
                      marginBottom: 20,
                      textAlign: "right",
                      color: "#004750",
                    }}
                  >
                    Proyecto
                  </Text>
                </View>
              </View>
              <Image
                src={lineaDegradadaPdf}
                alt="Logo"
                style={{ width: "100%", marginBottom: 20 }}
              />
            </View>

            {/* ---------------------------------- BODY ---------------------------------- */}
            <View
              style={{
                backgroundColor: "white",
                // paddingTop: 200,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 20,
                  marginTop: 20,
                  color: "#4E4E4E",
                }}
              >
                PROPUESTA TÉCNICA
              </Text>

              <View>
                <Text
                  style={{
                    fontSize: 14,
                    marginBottom: 30,
                    marginTop: 10,
                    color: "#004750",
                  }}
                >
                  1. ANTECEDENTES
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#004750" }}>
                    Empresa:
                  </Text>
                  <Text
                    style={{ fontSize: 12, marginLeft: 83, color: "#7B7B7B" }}
                  >
                    {dataClient.company
                      ? dataClient.company
                      : "Empresa ejemplo"}
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#004750" }}>
                    Nombre:
                  </Text>
                  <Text
                    style={{ fontSize: 12, marginLeft: 87, color: "#7B7B7B" }}
                  >
                    Oficinas {dataProject?.location}
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#004750" }}>
                    Área a certificar:
                  </Text>
                  <Text
                    style={{ fontSize: 12, marginLeft: 40, color: "#7B7B7B" }}
                  >
                    {dataProject?.m2} m2 aproximadamente
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#004750" }}>
                    Referencia:
                  </Text>
                  <Text
                    style={{ fontSize: 12, marginLeft: 73, color: "#7B7B7B" }}
                  >
                    {dataProject?.reference}
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#004750" }}>
                    Versión en revisión:
                  </Text>
                  <Text
                    style={{ fontSize: 12, marginLeft: 23, color: "#7B7B7B" }}
                  >
                    {dataProject?.review}
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#004750" }}>
                    Ubicación:
                  </Text>
                  <Text
                    style={{ fontSize: 12, marginLeft: 77, color: "#7B7B7B" }}
                  >
                    {dataProject.location}
                  </Text>
                </View>
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 14,
                    marginBottom: 30,
                    marginTop: 30,
                    color: "#004750",
                  }}
                >
                  2. OBJETIVO Y ALCANCE
                </Text>

                <Text
                  style={{ fontSize: 12, color: "#7B7B7B", lineHeight: 1.3 }}
                >
                  Se propone responder a lo solicitado por el cliente, para
                  requerimientos específicos del proyecto según se especifica a
                  continuación:
                </Text>

                <View style={{ marginTop: 30 }}>
                  {fees.map((data, index) => {
                    return (
                      <>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          borderBottom: 1,
                          borderColor: "#7B7B7B",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#004750",
                            width: "60%",
                            lineHeight: 1.3,
                          }}
                        >
                          {data.title}
                        </Text>
                        
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#004750",
                            width: "40%",
                            textAlign: "center",
                            lineHeight: 1.3,
                          }}
                        >
                          Entregable
                        </Text>
                      </View>
                      <View
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginBottom: 20,
                          marginTop: 15,
                        }}
                      >
                        <View style={{ width: "60%", paddingHorizontal: 5 }}>
                          {concept.map((dataConcept, index) => {
                            return (
                              <Text
                                key={index}
                                style={{
                                  fontSize: 9,
                                  color: "#7B7B7B",
                                  marginTop: 5,
                                  lineHeight: 1.3,
                                  marginRight: 1,
                                }}
                              >
                                {dataConcept.productId === data.id &&
                                  `F${index + 1} - ${dataConcept.title} \b `}
                              </Text>
                            );
                          })}
                        </View>
                        <View style={{ width: "40%", paddingHorizontal: 5 }}>
                          {scope.map((dataScope, index) => {
                            return (
                              <Text
                                key={index}
                                style={{
                                  marginLeft: 20,
                                  fontSize: 9,
                                  color: "#7B7B7B",
                                  lineHeight: 1.3,
                                }}
                              >
                                {dataScope.productId === data.id &&
                                  `F${index + 1} - ${dataScope.title} \b `}
                              </Text>
                            );
                          })}
                        </View>
                      </View>
                      </>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
          {/* --------------------------------- FOOTER --------------------------------- */}
          <View style={{ position: "absolute", bottom: 10 }}>
            <Image
              src={FooterPdf}
              style={{
                position: "absolute",
                display: "block",
                height: 80,
                minHeight: 80,
                minWidth: 650,
                width: 650,
              }}
            />
            <View style={{ marginTop: 20, marginLeft: "15%" }}>
              <Text style={{ fontSize: 10, color: "#01515C", lineHeight: 1.3 }}>
                m. +52 1 55 4393 4510
              </Text>
              <Text style={{ fontSize: 11, color: "#00454F", lineHeight: 1.3 }}>
                info@bnzero.com
              </Text>
              <Text style={{ fontSize: 10, color: "#01515C", lineHeight: 1.3 }}>
                bnzero.com
              </Text>
            </View>
          </View>
        </Page>

        {/* -------------------------------- PAGINA 3 -------------------------------- */}
        <Page
          size="A4"
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: 50,
            // justifyContent: "center",
            // alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              fontFamily: "Gotham",
              marginHorizontal: "5%",
              marginBottom: 95,
            }}
          >
            {/* --------------------------------- HEADER --------------------------------- */}
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  src={Logotype}
                  alt="Logo"
                  style={{ width: 100, marginBottom: 20, opacity: 1 }}
                />
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "gray",
                      marginBottom: 20,
                      textAlign: "right",
                      color: "#004750",
                    }}
                  >
                    {moment().format("MMM DD")} | {moment().format("YYYY")}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "gray",
                      marginBottom: 20,
                      textAlign: "right",
                      color: "#004750",
                    }}
                  >
                    Proyecto
                  </Text>
                </View>
              </View>
              <Image
                src={lineaDegradadaPdf}
                alt="Logo"
                style={{ width: "100%", marginBottom: 20 }}
              />
            </View>

            {/* ---------------------------------- BODY ---------------------------------- */}
            <View
              style={{
                backgroundColor: "white",
                // paddingTop: 200,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    marginBottom: 30,
                    marginTop: 10,
                    color: "#004750",
                  }}
                >
                  3. VALORES AGREGADOS:
                </Text>

                <View>
                  <Text
                    style={{ fontSize: 12, color: "#4E4E4E", lineHeight: 1.3 }}
                  >
                    Comunicación
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#7B7B7B",
                      lineHeight: 1.3,
                      marginBottom: 20,
                    }}
                  >
                    Comunicación adecuada con el cliente para lograr una buena
                    experiencia personalizada, potenciando los componentes
                    sostenibles del proyecto con acciones de green marketing
                    (gráficos y vídeos) para socializar el proceso y los
                    resultados del ejercicio, cuidando su economía y finanzas.
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: 20,
                    }}
                  >
                    <View style={{ width: "35%" }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#00454F",
                          lineHeight: 1.3,
                        }}
                      >
                        Infografía
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          color: "#7B7B7B",
                          lineHeight: 1.3,
                        }}
                      >
                        Presentación temática
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          color: "#00454F",
                          lineHeight: 1.3,
                        }}
                      >
                        Gráficos comparativos
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          color: "#7B7B7B",
                          lineHeight: 1.3,
                        }}
                      >
                        Banners para redes sociales
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          color: "#00454F",
                          lineHeight: 1.3,
                        }}
                      >
                        Video explicativo
                      </Text>
                    </View>

                    <View style={{ width: "30%" }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#7B7B7B",
                          lineHeight: 1.3,
                        }}
                      >
                        Diagramas de flujo
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          color: "#00454F",
                          lineHeight: 1.3,
                        }}
                      >
                        Tablas y gráficas{" "}
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          color: "#7B7B7B",
                          lineHeight: 1.3,
                        }}
                      >
                        Mapas mentales{" "}
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          color: "#00454F",
                          lineHeight: 1.3,
                        }}
                      >
                        Posters{" "}
                      </Text>
                    </View>

                    <View style={{ width: "35%" }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#7B7B7B",
                          lineHeight: 1.3,
                        }}
                      >
                        Folletos{" "}
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          color: "#00454F",
                          lineHeight: 1.3,
                        }}
                      >
                        Documentos institucionales{" "}
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          color: "#7B7B7B",
                          lineHeight: 1.3,
                        }}
                      >
                        Newsletters{" "}
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          color: "#00454F",
                          lineHeight: 1.3,
                        }}
                      >
                        Artículos{" "}
                      </Text>
                    </View>
                  </View>
                </View>

                <View>
                  <Text
                    style={{ fontSize: 12, color: "#4E4E4E", lineHeight: 1.3 }}
                  >
                    Educación
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#7B7B7B",
                      lineHeight: 1.3,
                      marginBottom: 20,
                    }}
                  >
                    Educación con piezas didácticas que permitan traducir la
                    información técnica a un lenguaje sencillo para los
                    participantes del proyecto y el público en general,
                    propiciando el aprendizaje de nuevos conceptos en
                    sostenibilidad y contribuir al cambio de hábitos en la
                    sociedad.
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: 20,
                    }}
                  >
                    <View style={{ width: "35%" }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#00454F",
                          lineHeight: 1.3,
                        }}
                      >
                        Vídeos explicativos{" "}
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          color: "#7B7B7B",
                          lineHeight: 1.3,
                        }}
                      >
                        Cursos{" "}
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          color: "#00454F",
                          lineHeight: 1.3,
                        }}
                      >
                        Talleres{" "}
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          color: "#7B7B7B",
                          lineHeight: 1.3,
                        }}
                      >
                        Capacitaciones{" "}
                      </Text>
                    </View>

                    <View style={{ width: "30%" }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#00454F",
                          lineHeight: 1.3,
                        }}
                      >
                        Asesorías{" "}
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          color: "#7B7B7B",
                          lineHeight: 1.3,
                        }}
                      >
                        Seminarios{" "}
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          color: "#00454F",
                          lineHeight: 1.3,
                        }}
                      >
                        Presentaciones{" "}
                      </Text>
                    </View>
                  </View>
                </View>

                <View>
                  <Text
                    style={{ fontSize: 12, color: "#4E4E4E", lineHeight: 1.3 }}
                  >
                    Vinculación
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#7B7B7B",
                      lineHeight: 1.3,
                      marginBottom: 20,
                    }}
                  >
                    Vinculación integral y holística con los beneficiarios y
                    participantes del proyecto para fortalecer las redes de
                    cooperación, posicionamiento y reconocimiento en el
                    ecosistema local.
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: 20,
                    }}
                  >
                    <View style={{ width: "35%" }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#00454F",
                          lineHeight: 1.3,
                        }}
                      >
                        Activaciones socio ambientales{" "}
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          color: "#7B7B7B",
                          lineHeight: 1.3,
                        }}
                      >
                        Intervenciones artísticas{" "}
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          color: "#00454F",
                          lineHeight: 1.3,
                        }}
                      >
                        Fundaciones y ONG´s{" "}
                      </Text>
                    </View>

                    <View style={{ width: "30%" }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#7B7B7B",
                          lineHeight: 1.3,
                        }}
                      >
                        Artistas{" "}
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          color: "#00454F",
                          lineHeight: 1.3,
                        }}
                      >
                        Instituciones de educación{" "}
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          color: "#7B7B7B",
                          lineHeight: 1.3,
                        }}
                      >
                        Proveedores{" "}
                      </Text>
                    </View>

                    <View style={{ width: "35%" }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#00454F",
                          lineHeight: 1.3,
                        }}
                      >
                        Empresas{" "}
                      </Text>

                      <Text
                        style={{
                          fontSize: 10,
                          color: "#7B7B7B",
                          lineHeight: 1.3,
                        }}
                      >
                        Entidades de gobierno{" "}
                      </Text>
                    </View>
                  </View>
                </View>

                <View>
                  <Text
                    style={{ fontSize: 12, color: "#4E4E4E", lineHeight: 1.3 }}
                  >
                    Vinculación
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#00454F",
                      lineHeight: 1.3,
                    }}
                  >
                    1. Acceso a capital de fondos verde con tasas preferenciales
                    cumpliendo los requisitos de sostenibilidad.
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#7B7B7B",
                      lineHeight: 1.3,
                    }}
                  >
                    2. Mayor velocidad de venta en productos inmobiliarios al
                    incorporar elementos de sostenibilidad de alto interés para
                    los clientes.{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#00454F",
                      lineHeight: 1.3,
                    }}
                  >
                    3. Experiencia como revisores del GBCI.{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#7B7B7B",
                      lineHeight: 1.3,
                    }}
                  >
                    4. Equipo multidisciplinar con credenciales en
                    sostenibilidad.{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#00454F",
                      lineHeight: 1.3,
                    }}
                  >
                    5. Expertos en softwares especializados en sostenibilidad
                    (DesignBuilder, Energyplus, eQuest, IES){" "}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* --------------------------------- FOOTER --------------------------------- */}
          <View>
            <Image
              src={FooterPdf}
              style={{
                position: "absolute",
                display: "block",
                height: 80,
                minHeight: 80,
                minWidth: 650,
                width: 650,
              }}
            />
            <View style={{ marginTop: 26, marginLeft: "5%" }}>
              <Text style={{ fontSize: 10, color: "#01515C", lineHeight: 1.3 }}>
                m. +52 1 55 4393 4510
              </Text>
              <Text style={{ fontSize: 11, color: "#00454F", lineHeight: 1.3 }}>
                info@bnzero.com
              </Text>
              <Text style={{ fontSize: 10, color: "#01515C", lineHeight: 1.3 }}>
                bnzero.com
              </Text>
            </View>
          </View>
        </Page>

        {/* -------------------------------- PAGINA 4 -------------------------------- */}
        <Page
          size="A4"
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: 50,
            // justifyContent: "center",
            // alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              fontFamily: "Gotham",
              marginHorizontal: "5%",
              marginBottom: 53,
            }}
          >
            {/* --------------------------------- HEADER --------------------------------- */}
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  src={Logotype}
                  alt="Logo"
                  style={{ width: 100, marginBottom: 20, opacity: 1 }}
                />
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "gray",
                      marginBottom: 20,
                      textAlign: "right",
                      color: "#004750",
                    }}
                  >
                    {moment().format("MMM DD")} | {moment().format("YYYY")}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "gray",
                      marginBottom: 20,
                      textAlign: "right",
                      color: "#004750",
                    }}
                  >
                    Proyecto
                  </Text>
                </View>
              </View>
              <Image
                src={lineaDegradadaPdf}
                alt="Logo"
                style={{ width: "100%", marginBottom: 20 }}
              />
            </View>

            {/* ---------------------------------- BODY ---------------------------------- */}
            <View
              style={{
                backgroundColor: "white",
                // paddingTop: 200,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 20,
                    marginTop: 20,
                    color: "#4E4E4E",
                  }}
                >
                  PROPUESTA ECONÓMICA
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    marginBottom: 30,
                    marginTop: 10,
                    color: "#004750",
                  }}
                >
                  4. PROPUESTA DE HONORARIOS{" "}
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#7B7B7B",
                      lineHeight: 1.3,
                      marginBottom: 20,
                    }}
                  >
                    La siguiente propuesta económica considera los servicios
                    descritos en este documento:
                  </Text>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderBottom: "1px solid #7B7B7B",
                      marginBottom: 10,
                      marginTop: 10,
                      paddingBottom: 2,
                      // justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 8,
                        color: "#7B7B7B",
                        width: "25%",
                        lineHeight: 1.3,
                        fontWeight: "800",
                      }}
                    >
                      Conceptos
                    </Text>

                    <Text
                      style={{
                        fontSize: 8,
                        color: "#7B7B7B",
                        width: "5%",
                        fontWeight: "800",
                        lineHeight: 1.3,
                        textAlign: "center",
                      }}
                    >
                      Meses
                    </Text>

                    <Text
                      style={{
                        fontSize: 8,
                        color: "#7B7B7B",
                        width: "10%",
                        fontWeight: "800",
                        lineHeight: 1.3,
                        textAlign: "center",
                      }}
                    >
                      Cantidad
                    </Text>

                    <Text
                      style={{
                        fontSize: 8,
                        color: "#7B7B7B",
                        width: "10%",
                        fontWeight: "800",
                        lineHeight: 1.3,
                        textAlign: "center",
                      }}
                    >
                      Valor
                    </Text>

                    <Text
                      style={{
                        fontSize: 8,
                        color: "#7B7B7B",
                        width: "15%",
                        fontWeight: "800",
                        lineHeight: 1.3,
                        textAlign: "center",
                      }}
                    >
                      Descuento
                    </Text>

                    <Text
                      style={{
                        fontSize: 8,
                        color: "#7B7B7B",
                        width: "10%",
                        fontWeight: "800",
                        lineHeight: 1.3,
                        textAlign: "center",
                      }}
                    >
                      IVA
                    </Text>

                    <Text
                      style={{
                        fontSize: 8,
                        color: "#7B7B7B",
                        width: "12%",
                        fontWeight: "800",
                        lineHeight: 1.3,
                        textAlign: "center",
                      }}
                    >
                      Total
                    </Text>

                    <Text
                      style={{
                        fontSize: 8,
                        color: "#7B7B7B",
                        width: "13%",
                        fontWeight: "800",
                        lineHeight: 1.3,
                        textAlign: "center",
                      }}
                    >
                      F. de pago
                    </Text>
                  </View>

                  {fees.map((dat, index) => {
                    return (
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          paddingTop: 10,
                        }}
                        key={index}
                      >
                        <Text
                          style={{
                            fontSize: 8,
                            color: "#7B7B7B",
                            borderRightStyle: "solid",
                            borderRightWidth: 1,
                            borderRightColor: "#F2F2F2",
                            lineHeight: 1.3,
                            width: "25%",
                            paddingTop: 8,
                          }}
                        >
                          {dat.CONCEPTOS}
                        </Text>
                        <Text
                          style={{
                            fontSize: 8,
                            color: "#7B7B7B",
                            borderRightStyle: "solid",
                            borderRightWidth: 1,
                            borderRightColor: "#F2F2F2",
                            width: "5%",
                            fontWeight: "800",
                            lineHeight: 1.3,
                            paddingTop: 8,
                            textAlign: "center",
                          }}
                        >
                          {dat.MESES}
                        </Text>
                        <Text
                          style={{
                            fontSize: 8,
                            color: "#7B7B7B",
                            borderRightStyle: "solid",
                            borderRightWidth: 1,
                            borderRightColor: "#F2F2F2",
                            width: "10%",
                            fontWeight: "800",
                            lineHeight: 1.3,
                            paddingTop: 8,
                            textAlign: "center",
                          }}
                        >
                          {/* UNIDAD */}
                          {dat.UNIDAD}
                        </Text>
                        <Text
                          style={{
                            fontSize: 8,
                            color: "#7B7B7B",
                            borderRightStyle: "solid",
                            borderRightWidth: 1,
                            borderRightColor: "#F2F2F2",
                            width: "10%",
                            fontWeight: "800",
                            lineHeight: 1.3,
                            textAlign: "center",
                          }}
                        >
                          {/* VALOR */}
                          {dat.VALOR} €
                        </Text>
                        <Text
                          style={{
                            fontSize: 8,
                            color: "#7B7B7B",
                            borderRightStyle: "solid",
                            borderRightWidth: 1,
                            borderRightColor: "#F2F2F2",
                            width: "15%",
                            fontWeight: "800",
                            lineHeight: 1.3,
                            paddingTop: 8,
                            textAlign: "center",
                          }}
                        >
                          {/* DESCUENTO */}
                          {dat.DESCUENTO} %
                        </Text>
                        <Text
                          style={{
                            fontSize: 8,
                            color: "#7B7B7B",
                            borderRightStyle: "solid",
                            borderRightWidth: 1,
                            borderRightColor: "#F2F2F2",
                            width: "12%",
                            fontWeight: "800",
                            lineHeight: 1.3,
                            textAlign: "center",
                          }}
                        >
                          {/* IVA */}
                          {dat.IVA} €
                        </Text>
                        <Text
                          style={{
                            fontSize: 8,
                            color: "#7B7B7B",
                            borderRightStyle: "solid",
                            borderRightWidth: 1,
                            borderRightColor: "#F2F2F2",
                            width: "12%",
                            fontWeight: "800",
                            lineHeight: 1.3,
                            textAlign: "center",
                          }}
                        >
                          {/* TOTAL */}
                          {dat.TOTAL} €
                        </Text>
                        <Text
                          style={{
                            fontSize: 8,
                            color: "#7B7B7B",
                            width: "13%",
                            paddingTop: 5,
                            fontWeight: "800",
                            lineHeight: 1.3,
                            textAlign: "center",
                          }}
                        >
                          {dat.PAGO}
                        </Text>
                      </View>
                    );
                  })}

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 10,
                      backgroundColor: "#F2F2F2",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 8,
                        color: "#7B7B7B",
                        width: "25%",
                        marginTop: 8,
                        // lineHeight: 1.3,
                        fontWeight: "800",
                        // textAlign: "center",
                        marginLeft: 5,
                      }}
                    >
                      TOTAL
                    </Text>
                    <Text
                      style={{
                        width: "5%",
                      }}
                    ></Text>

                    <Text
                      style={{
                        width: "10%",
                      }}
                    ></Text>

                    <Text
                      style={{
                        fontSize: 8,
                        color: "#7B7B7B",
                        width: "10%",
                        lineHeight: 1.3,
                        fontWeight: "800",
                        textAlign: "center",
                      }}
                    >
                      {totalPrice} €
                    </Text>
                    <Text
                      style={{
                        width: "15%",
                      }}
                    ></Text>
                    <Text
                      style={{
                        fontSize: 8,
                        color: "#7B7B7B",
                        width: "10%",
                        lineHeight: 1.3,
                        fontWeight: "800",
                        textAlign: "center",
                      }}
                    >
                      {totalIVA} €
                    </Text>

                    <Text
                      style={{
                        width: "12%",
                      }}
                    ></Text>

                    <Text
                      style={{
                        fontSize: 8,
                        color: "#7B7B7B",
                        width: "13%",
                        lineHeight: 1.3,
                        fontWeight: "800",
                        textAlign: "center",
                      }}
                    >
                      {total} €
                    </Text>
                  </View>
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      marginTop: 40,
                      marginBottom: 13,
                      lineHeight: 1.3,
                      color: "#004750",
                    }}
                  >
                    5. METODO DE PAGO{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#7B7B7B",
                      lineHeight: 1.3,
                    }}
                  >
                    1. Transferencia bancaria (mecanismo Swift)
                  </Text>
                  <View style={{ marginLeft: 15 }}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          lineHeight: 1.3,
                          width: "20%",
                          color: "#7B7B7B",
                        }}
                      >
                        Titular:
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          width: "80%",
                          lineHeight: 1.3,
                          color: "#7B7B7B",
                        }}
                      >
                        Global Objective Technical Office Guadalajara S de RL de
                        CV
                      </Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          lineHeight: 1.3,
                          width: "20%",
                          color: "#7B7B7B",
                        }}
                      >
                        RFC:{" "}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#7B7B7B",
                          lineHeight: 1.3,
                          width: "80%",
                        }}
                      >
                        GOT 110606 KG2{" "}
                      </Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          lineHeight: 1.3,
                          width: "20%",
                          color: "#7B7B7B",
                        }}
                      >
                        Banco:{" "}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#7B7B7B",
                          lineHeight: 1.3,
                          width: "80%",
                        }}
                      >
                        Bancomer{" "}
                      </Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          lineHeight: 1.3,
                          width: "20%",
                          color: "#7B7B7B",
                        }}
                      >
                        No. cuenta:{" "}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#7B7B7B",
                          lineHeight: 1.3,
                          width: "80%",
                        }}
                      >
                        0118041342{" "}
                      </Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          lineHeight: 1.3,
                          width: "20%",
                          color: "#7B7B7B",
                        }}
                      >
                        CLABE:{" "}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#7B7B7B",
                          lineHeight: 1.3,
                          width: "80%",
                        }}
                      >
                        012320001180413420{" "}
                      </Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          lineHeight: 1.3,
                          width: "20%",
                          color: "#7B7B7B",
                        }}
                      >
                        Sucursal:{" "}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#7B7B7B",
                          lineHeight: 1.3,
                          width: "80%",
                        }}
                      >
                        1010 (Terranova){" "}
                      </Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          lineHeight: 1.3,
                          width: "20%",
                          color: "#7B7B7B",
                        }}
                      >
                        Código Swift:{" "}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#7B7B7B",
                          lineHeight: 1.3,
                          width: "80%",
                        }}
                      >
                        BCMRMXMMPYM{" "}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: 10,
                      lineHeight: 1.3,
                      color: "#7B7B7B",
                    }}
                  >
                    2. Pago con tarjeta de crédito o débito vía PayPal
                    (https://www.paypal.com/mx/home) o Stripe
                    (https://stripe.com/es-mx).{" "}
                  </Text>

                  <Text
                    style={{
                      fontSize: 10,
                      lineHeight: 1.3,
                      color: "#7B7B7B",
                      marginBottom: 6,
                    }}
                  >
                    3. Transferencia con criptomonedas.{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      lineHeight: 1.3,
                      color: "#7B7B7B",
                      marginBottom: 8,
                    }}
                  >
                    4. Transferencia vía Wise (https://wise.com/).{" "}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* --------------------------------- FOOTER --------------------------------- */}
          <View style={{ position: "absolute", bottom: 10 }}>
            <Image
              src={FooterPdf}
              style={{
                position: "absolute",
                display: "block",
                height: 80,
                minHeight: 80,
                minWidth: 650,
                width: 650,
              }}
            />
            <View style={{ marginTop: 20, marginLeft: "15%" }}>
              <Text style={{ fontSize: 10, color: "#01515C", lineHeight: 1.3 }}>
                m. +52 1 55 4393 4510
              </Text>
              <Text style={{ fontSize: 11, color: "#00454F", lineHeight: 1.3 }}>
                info@bnzero.com
              </Text>
              <Text style={{ fontSize: 10, color: "#01515C", lineHeight: 1.3 }}>
                bnzero.com
              </Text>
            </View>
          </View>
        </Page>

        {/* -------------------------------- PAGINA 5 -------------------------------- */}
        <Page
          size="A4"
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: 50,
            // justifyContent: "center",
            // alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              fontFamily: "Gotham",
              marginHorizontal: "5%",
              marginBottom: 29,
            }}
          >
            {/* --------------------------------- HEADER --------------------------------- */}
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  src={Logotype}
                  alt="Logo"
                  style={{ width: 100, marginBottom: 20, opacity: 1 }}
                />
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "gray",
                      marginBottom: 20,
                      textAlign: "right",
                      color: "#004750",
                    }}
                  >
                    {moment().format("MMM DD")} | {moment().format("YYYY")}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "gray",
                      marginBottom: 20,
                      textAlign: "right",
                      color: "#004750",
                    }}
                  >
                    Proyecto
                  </Text>
                </View>
              </View>
              <Image
                src={lineaDegradadaPdf}
                alt="Logo"
                style={{ width: "100%", marginBottom: 20 }}
              />
            </View>

            {/* ---------------------------------- BODY ---------------------------------- */}
            <View
              style={{
                backgroundColor: "white",
                // paddingTop: 200,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    marginBottom: 10,
                    marginTop: 10,
                    color: "#004750",
                    lineHeight: 1.3,
                  }}
                >
                  6. TÉRMINOS Y CONDICIONES
                </Text>

                <View
                  style={{
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  {termsAndConditions.map((term) => {
                    return (
                      <View
                        style={{ flexDirection: "row", marginBottom: 8 }}
                        key={term.id}
                      >
                        <Text
                          style={{
                            fontSize: 8,
                            fontWeight: "light",
                            width: "5%",
                            lineHeight: 1.3,
                            color: "#7B7B7B",
                          }}
                        >
                          {convertToRoman(term.idOrder)}.
                        </Text>
                        <Text
                          style={{
                            fontSize: 8,
                            width: "95%",
                            textAlign: "justify",
                            lineHeight: 1.3,
                            color: "#7B7B7B",
                          }}
                        >
                          {term.description.trim()}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 14,
                    marginBottom: 10,
                    marginTop: 10,
                    color: "#004750",
                    lineHeight: 1.3,
                  }}
                >
                  7. CONFIDENCIALIDAD
                </Text>

                <Text
                  style={{ fontSize: 8, lineHeight: 1.3, color: "#7B7B7B" }}
                >
                  Esta oferta incluye información estratégica y confidencial de
                  bnzero, y no debe ser distribuida a personas que no estén
                  directamente involucradas en la evolución y/o decisión de la
                  oferta objeto del presente documento.
                </Text>
                <View
                  style={{
                    borderTop: "2px solid #00A297",
                    width: "100%",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: 8,
                    marginTop: 10,
                    lineHeight: 1.3,
                    color: "#7B7B7B",
                  }}
                >
                  Los derechos de propiedad intelectual sobre esta propuesta de
                  servicios profesionales y sus contenidos pertenecen
                  exclusivamente al oferente de esta propuesta. Su publicación
                  y/ó entrega a terceros, parcial, completa y/o en forma de
                  resumen, por escrito o electrónicamente, está expresamente
                  prohibida.
                </Text>
                <Text
                  style={{
                    fontSize: 8,
                    marginTop: 10,
                    marginBottom: 20,
                    lineHeight: 1.3,
                    color: "#7B7B7B",
                  }}
                >
                  Cualquier excepción a estos derechos requerirá de un permiso
                  escrito y previa aceptación por parte del oferente. El lugar
                  de jurisdicción es Guadalajara, Jalisco, México.
                </Text>
              </View>
            </View>
          </View>
          {/* --------------------------------- FOOTER --------------------------------- */}
          <View style={{ position: "absolute", bottom: 10 }}>
            <Image
              src={FooterPdf}
              style={{
                position: "absolute",
                display: "block",
                height: 80,
                minHeight: 80,
                minWidth: 650,
                width: 650,
              }}
            />
            <View style={{ marginTop: 20, marginLeft: "15%" }}>
              <Text style={{ fontSize: 10, color: "#01515C", lineHeight: 1.3 }}>
                m. +52 1 55 4393 4510
              </Text>
              <Text style={{ fontSize: 11, color: "#00454F", lineHeight: 1.3 }}>
                info@bnzero.com
              </Text>
              <Text style={{ fontSize: 10, color: "#01515C", lineHeight: 1.3 }}>
                bnzero.com
              </Text>
            </View>
          </View>
        </Page>

        {/* -------------------------------- PAGINA 6 -------------------------------- */}

        <Page
          size="A4"
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              fontFamily: "Gotham",
            }}
          >
            {backgroundSrcCP ? (
              <Image
                src={backgroundSrcCP}
                style={{
                  position: "absolute",
                  height: "100vh",
                  width: "100vh",
                  objectFit: "cover",
                  zIndex: 0,
                }}
              />
            ) : (
              <Image
                src={BackgroundEnd}
                style={{
                  position: "absolute",
                  height: "100vh",
                  width: "100vh",
                  objectFit: "cover",
                  zIndex: 0,
                }}
              />
            )}
          </View>
        </Page>
      </Document>
    )
  );
}

export default PDF;

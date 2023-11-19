import { getConcept } from "../../services/Admin.service";
import messagebox from "../../utils/messagebox";

function getNumbersInString(string) {
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
  }

function Concepts({ id, concept, price, unit, discount, imported, duration, billing, reference, review, scope, products, concepts, setConcepts, isBlock }) {

    async function autoFillConcept(value) {
        let conceptsTemp = concepts;
        let { duration, facturation, price, ref } = products[value];
        conceptsTemp[id] = { ...conceptsTemp[id], concept: value, price: getNumbersInString(price), unit: 0, duration: getNumbersInString(duration), billing: facturation, reference: ref };
        await getConcept(products[value].id)
            .then(({ data }) => {
                if (data.error) {
                    messagebox.Simple(data.message, 'error')
                } else {
                    let scopes = '';
                    data.map((scope) => scopes = `${scopes}\n${scope.title}`)
                    conceptsTemp[id].scope = scopes.trim();
                    setConcepts([...conceptsTemp]);
                }
            })
            .catch(err => messagebox.Simple(err, 'error'))
    }

    function updateInput(type, value) {
        let conceptsTemp = concepts;
        conceptsTemp[id][type] = value;
        setConcepts([...conceptsTemp]);
    }

    function deleteConcept() {
        let newConcepts = [];
        concepts.filter((concept, index) => index !== id).map(concept => newConcepts.push({ ...concept }))
        setConcepts([...newConcepts]);
    }

    const searchForReference = async (e) => {
        e.preventDefault();
        const { value } = e.target;
        updateInput('reference', value);
        if (value.length > 3) {
            let conceptsTemp = concepts;
            if (products.find(r => r.ref === value)) {
                let { duration, facturation, price, ref } = products.find(r => r.ref === value);
                conceptsTemp[id] = { ...conceptsTemp[id], concept: value, price, unit: 0, duration, billing: facturation, reference: ref };
                await getConcept(products.find(r => r.ref === value).id)
                    .then(({ data }) => {
                        if (data.error) {
                            messagebox.Simple(data.message, 'error')
                        } else {
                            let scopes = '';
                            data.map((scope) => scopes = `${scopes}\n${scope.title}`)
                            conceptsTemp[id].scope = scopes.trim();
                            setConcepts([...conceptsTemp]);
                        }
                    })
                    .catch(err => messagebox.Simple(err, 'error'))
            }
        }
    }

    return (
        <div className="lg:flex block ">
            <div className='lg:flex block'>
                <div className="block mx-auto my-3">
                    <div className="lg:flex block">
                        <div className="lg:flex block">
                            <div className="block">
                                <div className="mt-2 mx-4">
                                    <div className="mb-3">
                                        <label htmlFor="comcept-select" className="form-label" >Concepto *</label>
                                        <div className="select">
                                            <select
                                                value={concept}
                                                id="comcept-select"
                                                onChange={e => autoFillConcept(e.target.value)}
                                                disabled={isBlock || false}
                                            >
                                                <option value='noData' disabled>Seleccione un concepto base</option>
                                                {
                                                    products.length > 0
                                                    && products.map((product, index) => <option key={index} value={index}>{product.title}</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:grid lg:grid-cols-4 block">
                                    <div className="mt-2 mx-4">
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label" >Precio(Sin Iva)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={price}
                                                onChange={e => {
                                                    updateInput('price', e.target.value)
                                                    let imported;
                                                    if (discount !== 0) imported = (unit * e.target.value) - ((unit * e.target.value) * (discount / 100))
                                                    else imported = unit * e.target.value;
                                                    updateInput('imported', imported)
                                                }}
                                                disabled={isBlock || false}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2 mx-4">
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label" >Cantidad</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={unit}
                                                onChange={e => {
                                                    updateInput('unit', e.target.value)
                                                    let imported;
                                                    if (discount !== 0) imported = (e.target.value * price) - ((e.target.value * price) * (discount / 100))
                                                    else imported = e.target.value * price;
                                                    updateInput('imported', imported)
                                                }}
                                                disabled={isBlock || false}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2 mx-4">
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label" >Descuento</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={discount}
                                                onChange={e => {
                                                    updateInput('discount', e.target.value)
                                                    let imported;
                                                    if (Number(e.target.value) !== 0) {
                                                        const discount = (unit * price) * (Number(e.target.value)/100)
                                                        imported = (unit * price) - discount;
                                                        updateInput('imported', imported)
                                                    }
                                                }}
                                                disabled={isBlock || false}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2 mx-4">
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label" >Importe</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={imported}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2 mx-4">
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label" >Duración(Meses)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="email-username"
                                                value={duration}
                                                onChange={e => updateInput('duration', e.target.value)}
                                                disabled={isBlock || false}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2 mx-4">
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label" >Facturación</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="email-username"
                                                value={billing}
                                                onChange={e => updateInput('billing', e.target.value)}
                                                disabled={isBlock || false}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2 mx-4">
                                        <div className="mb-3">
                                            <div className="relative flex flex-row items-center justify-center">
                                                <label htmlFor="email" className="form-label" >Referencia</label>
                                                <div className="tooltipimg">
                                                    <img src="https://image.freepik.com/iconos-gratis/contorno-circulo-con-signo-de-exclamacion_318-49537.jpg" alt="exclamation" style={{ height: 10, marginTop: -10, marginLeft: 10 }} />
                                                    <span className="tooltiptext">Puedes escribir el ID</span>
                                                </div>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="email-username"
                                                value={reference}
                                                onChange={searchForReference}
                                                disabled={isBlock || false}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2 mx-4">
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label" >Revisión</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="email-username"
                                                value={review}
                                                onChange={e => updateInput('review', e.target.value)}
                                                disabled={isBlock || false}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 mx-4">
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label" >Descripción del servicio</label>
                                        <textarea
                                            name="textarea"
                                            className="form-control"
                                            value={scope}
                                            onChange={e => updateInput('scope', e.target.value)}
                                            disabled={isBlock || false}
                                            placeholder='Descripción'
                                            style={{
                                                gridColumn: '2fr',
                                                gridRow: '1fr'
                                            }}
                                        />
                                    </div>
                                    {
                                        (id !== 0 && !isBlock)
                                        && <div className='my-3'><button className='buttonDelete' onClick={() => deleteConcept()}>Eliminar</button></div>
                                    }
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Concepts;
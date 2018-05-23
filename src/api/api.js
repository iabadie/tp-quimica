const CapacidadHielo = 2.05
const latenteHieloAgua = 333.5
const latenteAguaVapor = 2257
const CapacidadAgua =4.18


export const tiempoDeTransformacion = (masa, QS, deltaH) => {
  // cantidad de calor que entra en este tiempo por la cantidad de calor necesaria para fundir un kilogramo de la materia
  const ms = QS * deltaH
  // Masa Total sobre masa por segundo, convertido a minutos
  return (masa / ms) / 60;
}

export const cantidad_de_calor = (masa, Cesp, deltaT ) => {
  return masa * Cesp * deltaT;
}

export const calor_latente =  (masa, L) => {
  return masa * L;
}

export const entropia_t_cte = ( Q, T) => {
  return Q / T;
}
export const entropia_t_variable = ( masa, CapacidadCalorica, t2, t1) => {
  return masa * CapacidadCalorica * Math.log( t2 / t1 );
}

export const kelvin_a_celcius = (K) => {
  return K - 273.16;
}

export const celcius_a_kelvin = (C) => {
  return C + 273.16;
}


export const initProcess = (Ti, masa, estadoInicial) => {
  console.log(Ti, masa, estadoInicial);
  const entropia = [];
  const data = [];
  let Q_hielo_agua = 0;
  let Q_latente_hielo = 0;
  let delta_S_hielo_a_agua = 0;
  let delta_S_hielo = 0;

  let acumuladorCalor = 0;
  let acumuladorEntropia = 0;
  debugger;
  if(estadoInicial === "Hielo") {
    if (Ti < 0) {

      // Calor de hielo  T a 0
      Q_hielo_agua = cantidad_de_calor(masa, CapacidadHielo, (0 - Ti));
      delta_S_hielo_a_agua = entropia_t_variable(masa, CapacidadHielo, celcius_a_kelvin(0), celcius_a_kelvin(Ti));
      data.push({x: 0, y: Ti});
      entropia.push({x: 0, y: Ti});
      acumuladorCalor += Q_hielo_agua;
      acumuladorEntropia += delta_S_hielo_a_agua;
      data.push({x: acumuladorCalor, y: 0});
      entropia.push({x: acumuladorEntropia, y: 0});
    }

    // Calor latente de fusion
    Q_latente_hielo =calor_latente(masa, latenteHieloAgua);
    delta_S_hielo = entropia_t_cte(Q_latente_hielo, celcius_a_kelvin(0));
    data.push({x: acumuladorCalor, y: 0});
    entropia.push({x: acumuladorEntropia, y: 0});
    acumuladorCalor += Q_latente_hielo
    acumuladorEntropia += delta_S_hielo
    data.push({x: acumuladorCalor, y: 0});
    entropia.push({x: acumuladorEntropia, y: 0});
  }

  // Calor de agua T a  100
  const Q_agua_vapor = cantidad_de_calor(masa, CapacidadAgua, (100 - (Ti > 0 ? Ti : 0)));
  const delta_S_agua_a_vapor = entropia_t_variable(masa, CapacidadAgua, celcius_a_kelvin(100), celcius_a_kelvin(Ti));
  data.push({x: acumuladorCalor, y: (Ti > 0 ? Ti : 0)});
  entropia.push({x: acumuladorEntropia, y: (Ti > 0 ? Ti : 0)});
  acumuladorCalor += Q_agua_vapor
  acumuladorEntropia += delta_S_agua_a_vapor
  data.push({x: acumuladorCalor, y: 100});
  entropia.push({x: acumuladorEntropia, y: 100});


  // Calor Latente evaporacion
  const Q_latente_vapor = calor_latente(masa, latenteAguaVapor);
  const delta_S_vapor = entropia_t_cte(Q_latente_vapor, celcius_a_kelvin(100));
  data.push({x: acumuladorCalor, y: 100});
  entropia.push({x: acumuladorEntropia, y: 100});
  acumuladorCalor += Q_latente_vapor
  acumuladorEntropia += delta_S_vapor
  data.push({x: acumuladorCalor, y: 100});
  entropia.push({x: acumuladorEntropia, y: 100});



  const QalorTotalSuministrado = (Q_hielo_agua + Q_latente_hielo + Q_agua_vapor + Q_latente_vapor).toFixed(2);
  const EntropiaTotal = (delta_S_hielo_a_agua + delta_S_hielo + delta_S_agua_a_vapor + delta_S_vapor).toFixed(2);


  return {
    QalorTotalSuministrado,
    EntropiaTotal,
    data,
    entropia
  }
}

export const REGIONS = [
  { id: 'Norte', name: 'Norte', states: ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'] },
  { id: 'Nordeste', name: 'Nordeste', states: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'] },
  { id: 'Centro-Oeste', name: 'Centro-Oeste', states: ['DF', 'GO', 'MT', 'MS'] },
  { id: 'Sudeste', name: 'Sudeste', states: ['ES', 'MG', 'RJ', 'SP'] },
  { id: 'Sul', name: 'Sul', states: ['PR', 'RS', 'SC'] }
];

export const ACADEMIC_AREAS = [
  { id: 1, name: 'Ciências Exatas e da Terra' },
  { id: 2, name: 'Ciências Biológicas' },
  { id: 3, name: 'Engenharias' },
  { id: 4, name: 'Ciências da Saúde' },
  { id: 5, name: 'Ciências Agrárias' },
  { id: 6, name: 'Ciências Sociais Aplicadas' },
  { id: 7, name: 'Ciências Humanas' },
  { id: 8, name: 'Linguística, Letras e Artes' }
];

export const CAMPUSES = [
  // Norte
  { id: 100, name: 'UFAC - Campus Rio Branco', city: 'Rio Branco', state: 'AC' },
  { id: 101, name: 'UFAC - Campus Cruzeiro do Sul', city: 'Cruzeiro do Sul', state: 'AC' },
  { id: 102, name: 'UNIFAP - Campus Marco Zero', city: 'Macapá', state: 'AP' },
  { id: 103, name: 'UNIFAP - Campus Santana', city: 'Santana', state: 'AP' },
  { id: 104, name: 'UFAM - Campus Manaus', city: 'Manaus', state: 'AM' },
  { id: 105, name: 'UEA - Campus Manaus', city: 'Manaus', state: 'AM' },
  { id: 106, name: 'UFPA - Campus Belém', city: 'Belém', state: 'PA' },
  { id: 107, name: 'UFRA - Campus Belém', city: 'Belém', state: 'PA' },
  { id: 108, name: 'UNIFESSPA - Campus Marabá', city: 'Marabá', state: 'PA' },
  { id: 109, name: 'UFOPA - Campus Santarém', city: 'Santarém', state: 'PA' },
  { id: 110, name: 'UNIR - Campus Porto Velho', city: 'Porto Velho', state: 'RO' },
  { id: 111, name: 'UFRR - Campus Paricarana', city: 'Boa Vista', state: 'RR' },
  { id: 112, name: 'UFT - Campus Palmas', city: 'Palmas', state: 'TO' },
  { id: 113, name: 'UFT - Campus Araguaína', city: 'Araguaína', state: 'TO' },
  // Outros (Exemplos)
  { id: 1, name: 'USP - Campus São Paulo', city: 'São Paulo', state: 'SP' },
  { id: 2, name: 'UNICAMP - Campus Campinas', city: 'Campinas', state: 'SP' },
  { id: 3, name: 'UFRJ - Campus Fundão', city: 'Rio de Janeiro', state: 'RJ' },
  { id: 4, name: 'UFPE - Campus Recife', city: 'Recife', state: 'PE' }
];

export const ROLES = {
  'STUDENT': 'Estudante',
  'PROFESSOR': 'Professor',
  'COORDINATOR': 'Coordenador',
  'VISITOR': 'Visitante',
  'RESEARCHER': 'Pesquisador' // Mapped to PROFESSOR internally usually, but if returned as RESEARCHER
};

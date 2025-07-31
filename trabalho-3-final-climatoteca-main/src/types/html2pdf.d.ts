// por algum motivo o typescript reclama do html2pdf não estar tipado
// a sugestão da ide é que eu instale a dependencia @types/html2pdf.js
// mas como essa tipagem não existe, a segunda recomendação da ide é
// tipar eu msm >> logo aqui estamos nós
declare module 'html2pdf.js' {
  const html2pdf: any;
  export default html2pdf;
}
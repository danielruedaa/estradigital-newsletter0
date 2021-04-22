import { MD5 } from '../utils/md5';

export const useData = () => {

   const removeAccents = (str:string) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

  const parse = ({document, documentType, name1, name2, lastName1, lastName2, email, phone, total, orderId, quota, NIT, bill}:any) => {
    const structure = [
      {
         "id":"TD1",
         "value": documentType == "cedulaCOL" ? "1" : "4",
         "isDisabled":"true"
      },
      {
         "id":"NI2",
         "value":document.toString(),
         "isDisabled":"true"
      },
      {
         "id":"FED3",
         "value":"",
         "isDisabled":"false"
      },
      {
         "id":"PN7",
         "value":removeAccents(name1.toString()),
         "isDisabled":"true"
      },
      {
         "id":"SN8",
         "value":removeAccents(name2.toString()),
         "isDisabled":"true"
      },
      {
         "id":"PA9",
         "value":removeAccents(lastName1.toString()),
         "isDisabled":"true"
      },
      {
         "id":"SA10",
         "value":removeAccents(lastName2.toString()),
         "isDisabled":"true"
      },
      {
         "id":"FN6",
         "value":"",
         "isDisabled":"false"
      },
      {
         "id":"CCE17",
         "value":email.toString(),
         "isDisabled":"true"
      },
      {
         "id":"CEL14",
         "value":(phone.toString() || '').replace('+57', ''),
         "isDisabled":"true"
      },
      {
         "id":"CS21",
         "value":total.toString(),
         "isDisabled":"true"
      },
      {
         "id":"IDO24",
         "value":orderId.toString(),
         "isDisabled":"true"
      },
      {
         "id":"NIC01",
         "value": bill,
         "isDisabled":"true"
      },
      {
         "id":"VC22",
         "value":quota.toString(),
         "isDisabled":"true"
      }
   ]
   
   const base64 = btoa(JSON.stringify(structure));
   const urlEncode = encodeURI(base64);
   const NITbase64 = btoa(NIT);
   const data = base64 + '-' + NITbase64;
   const hashData = MD5(data);
   window.location.href = urlRender(urlEncode, hashData);
  }

  const urlRender = (urlEncode: string, md5: string) => {

      //https://demo.experienciadigital.com/eScala/#/?idFlow=7&idSub=800249860&data=
      //https://celsia.experienciadigital.com/eScala/#/?data=
     return "https://celsia.experienciadigital.com/eScala/#/?data="+ urlEncode +"&hash=" + md5
  }

  return {
    parse
  }
}
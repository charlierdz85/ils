import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

export class UtilsService {

  constructor() {}

  public arrayRemoveDuplicate(arrayParam: any) {
    arrayParam = arrayParam.filter((thing, index) => {
      const _thing = JSON.stringify(thing);
      return index === arrayParam.findIndex(obj => {
        return JSON.stringify(obj) === _thing;
      });
    });

    return arrayParam;
  }

  async blobToBase64(fileParam: any) {
    const file = await fileParam;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  public base64ToBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  /**
   * Get kb length of string
   * @param String
   * Created by: Ophir LOJKINE (GitHub) - https://gist.github.com/lovasoa/11357947
   */
  byteLength(str) {
    // returns the byte length of an utf8 string
    let s = str.length;
    for (let i = str.length - 1; i >= 0; i--) {
      const code = str.charCodeAt(i);
      if (code > 0x7f && code <= 0x7ff) {
        s++;
      } else if (code > 0x7ff && code <= 0xffff) {
        s += 2;
      }
      if (code >= 0xDC00 && code <= 0xDFFF) {
        i--;
      }
    }
    return (s / 1000);
  }

  downloadDataURIFile(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 (Stackoverflow) for code that does this
    const byteString = atob(dataURI.split(',')[1]);
    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    const objectBlob: Blob = new Blob([ab], {type: mimeString});
    const url = window.URL.createObjectURL(objectBlob);
    window.open(url);
  }

  public dateToStringFormat(dateParam: Date) {
    const sfdyear = dateParam.getFullYear().toString();
    const sfdMonth = (dateParam.getMonth() + 1).toString();
    const sfdDay = dateParam.getDate().toString();
    const sfdHour = dateParam.getHours().toString();
    const sfdMinute = (dateParam.getMinutes()).toString();

    const date = sfdyear + '-' + (sfdMonth.length === 1 ? '0' + sfdMonth : sfdMonth) + '-' + (sfdDay.length === 1 ? '0' + sfdDay : sfdDay);
    const hour = (sfdHour.length === 1 ? '0' + sfdHour : sfdHour) + ':' + (sfdMinute.length === 1 ? '0' + sfdMinute : sfdMinute);
    return date + ' ' + hour;
  }

  public divToPDF(divIdParam: string, documentNameParam: string) {
    const data = document.getElementById(divIdParam);
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(documentNameParam + '.pdf'); // Generated PDF
    });
  }

  public encriptAttributeValue(dataParam: any) {
    if (typeof dataParam === undefined || dataParam === null) {
      return this.stringUriEncode('');
    } else if (dataParam instanceof Array) {
      for (const attrItem of dataParam) {
        for (const itm of Object.keys(attrItem)) {
          if (attrItem[itm] instanceof Array || (!(attrItem[itm] instanceof Date) && typeof attrItem[itm] === 'object')) {
            attrItem[itm] = this.encriptAttributeValue(attrItem[itm]);
          } else {
            if (attrItem[itm] instanceof Date) {
              attrItem[itm] = this.stringUriEncode(this.dateToStringFormat(attrItem[itm]));
            } else {
              attrItem[itm] = this.stringUriEncode(attrItem[itm]);
            }
          }
        }
      }
    } else {
      if (!(dataParam instanceof Date) && typeof dataParam === 'object') {
        for (const itm of Object.keys(dataParam)) {
          if (dataParam[itm] instanceof Array || (!(dataParam[itm] instanceof Date) && typeof dataParam[itm] === 'object')) {
            dataParam[itm] = this.encriptAttributeValue(dataParam[itm]);
          } else {
            if (dataParam[itm] instanceof Date) {
              dataParam[itm] = this.stringUriEncode(this.dateToStringFormat(dataParam[itm]));
            } else {
              dataParam[itm] = this.stringUriEncode(dataParam[itm]);
            }
          }
        }
      } else {
        if (dataParam instanceof Date) {
          dataParam = this.stringUriEncode(this.dateToStringFormat(dataParam));
        } else {
          dataParam = this.stringUriEncode(dataParam);
        }
      }
    }

    return dataParam;
  }

  public stringUriEncode(stringParam: string): string {
    return encodeURIComponent(btoa(stringParam));
  }

  public stringUriDecode(stringParam: string): string {
    let valueDecoded = atob(decodeURIComponent(stringParam));
    if (valueDecoded.search(';base64,') > 0) {
      valueDecoded = valueDecoded.replace('  ', '++').replace(' ', '+');
    }
    return valueDecoded;
  }

  public paramsDecode(objData: any): any {
    try {
      if (Array.isArray(objData)) {
        for (let itm of objData) {
          itm = this.paramsDecode(itm);
        }
      } else {
        for (const objItem of Object.keys(objData)) {
          if (Array.isArray(objData[objItem]) || typeof objData[objItem] === 'object') {
            this.paramsDecode(objData[objItem]);
          } else {
            objData[objItem] = this.stringUriDecode(objData[objItem]);
          }
        }
      }
    } catch (error) {}

    return objData;
  }

}

export const cloneObject = <T>(target: T): T => {
  if (target === null) {
    return target;
  }
  if (target instanceof Date) {
    return new Date(target.getTime()) as any;
  }
  if (target instanceof Array) {
    const cp = [] as any[];
    (target as any[]).forEach((v) => { cp.push(v); });
    return cp.map((n: any) => cloneObject<any>(n)) as any;
  }
  if (typeof target === 'object' && target !== {}) {
    const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
    Object.keys(cp).forEach(k => {
      cp[k] = cloneObject<any>(cp[k]);
    });
    return cp as T;
  }
  return target;
};

export class TimberNode {
  constructor({
    zone,
    timberID,
    kind,
    weight,
    status,
    height,
    quantity,
    price,
    cutDate,
  }) {
    this.zone = String(zone || '').trim().charAt(0);
    this.timberID = parseInt(timberID, 10);
    this.kind = String(kind || '').trim();
    this.weight = parseFloat(weight);
    this.status = String(status || '').trim();
    this.height = parseFloat(height);
    this.quantity = parseInt(quantity, 10);
    this.price = parseInt(price, 10);
    this.cutDate = String(cutDate || '').trim();
    this.next = null;
  }

  toObject() {
    return {
      zone: this.zone,
      timberID: this.timberID,
      kind: this.kind,
      weight: this.weight,
      status: this.status,
      height: this.height,
      quantity: this.quantity,
      price: this.price,
      cutDate: this.cutDate,
    };
  }
}

export class InventoryControlSystem {
  constructor() {
    this.first = null;
    this.last = null;
  }

  clone() {
    const copy = new InventoryControlSystem();
    let temp = this.first;
    while (temp !== null) {
      copy.addRecord(temp.toObject());
      temp = temp.next;
    }
    return copy;
  }

  addRecord(recordData) {
    const cur = new TimberNode(recordData);
    cur.next = null;

    if (this.first === null) {
      this.first = this.last = cur;
    } else {
      this.last.next = cur;
      this.last = cur;
    }
    return cur;
  }

  getAllRecords() {
    const records = [];
    let temp = this.first;
    while (temp !== null) {
      records.push(temp.toObject());
      temp = temp.next;
    }
    return records;
  }

  isEmpty() {
    return this.first === null;
  }

  displayZone(z) {
    if (this.first === null) {
      return { found: false, message: 'No records found.', records: [] };
    }
    const targetZone = String(z || '').trim().charAt(0);
    let temp = this.first;
    const matching = [];
    while (temp !== null) {
      if (temp.zone === targetZone) {
        matching.push(temp.toObject());
      }
      temp = temp.next;
    }
    if (matching.length === 0) {
      return {
        found: false,
        message: 'No records found for zone ' + targetZone,
        records: [],
      };
    }
    return {
      found: true,
      message: 'Records found for zone ' + targetZone,
      records: matching,
    };
  }

  displayKind(k) {
    if (this.first === null) {
      return { found: false, message: 'No records found.', records: [] };
    }
    const targetKind = String(k || '').trim().toLowerCase();
    let temp = this.first;
    const matching = [];
    while (temp !== null) {
      if (temp.kind.toLowerCase() === targetKind) {
        matching.push(temp.toObject());
      }
      temp = temp.next;
    }
    if (matching.length === 0) {
      return {
        found: false,
        message: 'No record found for kind: ' + k,
        records: [],
      };
    }
    return {
      found: true,
      message: 'Records found for kind: ' + k,
      records: matching,
    };
  }

  analysis() {
    let temp = this.first;
    const matching = [];
    while (temp !== null) {
      if (temp.quantity < 100) {
        matching.push(temp.toObject());
      }
      temp = temp.next;
    }
    if (matching.length === 0) {
      return {
        found: false,
        message: 'no low quantity recods found.',
        header: 'recods with quantity les than 100:',
        records: [],
      };
    }
    return {
      found: true,
      message: 'Low quantity records found.',
      header: 'recods with quantity les than 100:',
      records: matching,
    };
  }

  salesUpdate(timberID, qty) {
    if (this.first === null) {
      return { success: false, message: 'No records found.' };
    }
    const id = parseInt(timberID, 10);
    const quantityToSell = parseInt(qty, 10);

    let temp = this.first;
    while (temp !== null) {
      if (temp.timberID === id) {
        if (quantityToSell > temp.quantity) {
          return {
            success: false,
            message: ' Not enough stock.',
            record: temp.toObject(),
          };
        } else {
          temp.quantity -= quantityToSell;
          if (temp.quantity === 0) {
            temp.status = 'Sold';
          }
          return {
            success: true,
            message: 'Sale recorded successfully.',
            updatedRecord: temp.toObject(),
          };
        }
      }
      temp = temp.next;
    }
    return { success: false, message: 'TimberID not found.' };
  }

  deleteRecord(timberID) {
    if (this.first === null) {
      return { success: false, message: 'No records to delete.' };
    }
    const id = parseInt(timberID, 10);
    let temp = this.first;
    let prev = null;

    while (temp !== null) {
      if (temp.timberID === id) {
        if (temp === this.first) {
          this.first = temp.next;
          if (this.first === null) {
            this.last = null;
          }
        } else {
          prev.next = temp.next;
          if (temp === this.last) {
            this.last = prev;
          }
        }
        return { success: true, message: 'Record deleted successfully.' };
      }
      prev = temp;
      temp = temp.next;
    }
    return { success: false, message: 'Record not found.' };
  }

  updateRecord(timberID, { newQuantity, newPrice, newStatus }) {
    if (this.first === null) {
      return { success: false, message: 'No records to update.' };
    }
    const id = parseInt(timberID, 10);
    let temp = this.first;

    while (temp !== null) {
      if (temp.timberID === id) {
        temp.quantity = parseInt(newQuantity, 10);
        temp.price = parseInt(newPrice, 10);
        temp.status = String(newStatus || '').trim();
        return {
          success: true,
          message: 'Record updated successfully.',
          record: temp.toObject(),
        };
      }
      temp = temp.next;
    }
    return { success: false, message: 'Record not found.' };
  }

  inventoryReport() {
    if (this.first === null) {
      return {
        available: false,
        message: 'No records available.',
        records: [],
        totalQty: 0,
        totalPrice: 0,
      };
    }
    let temp = this.first;
    let totalQty = 0;
    let totalPrice = 0;
    const records = [];

    while (temp !== null) {
      records.push(temp.toObject());
      totalQty += temp.quantity;
      totalPrice += temp.price;
      temp = temp.next;
    }

    return {
      available: true,
      header: '----- Inventory Report -----',
      records,
      totalQty,
      totalPrice,
    };
  }

  backupData() {
    let cur = this.first;
    if (cur === null) {
      return { success: false, message: 'No records to backup.' };
    }

    let csv = '';
    while (cur !== null) {
      csv += cur.zone + ',' +
             cur.timberID + ',' +
             cur.kind + ',' +
             cur.weight + ',' +
             cur.status + ',' +
             cur.height + ',' +
             cur.quantity + ',' +
             cur.price + ',' +
             cur.cutDate + '\n';
      cur = cur.next;
    }

    return {
      success: true,
      message: 'Data successfully backed up to timberdata.txt',
      content: csv,
      filename: 'timberdata.txt',
    };
  }

  restoreData(fileContent) {
    try {
      if (!fileContent || !fileContent.trim()) {
        return { success: false, message: 'No backup file found!' };
      }

      const lines = fileContent.trim().split(/\r?\n/);
      this.first = null;
      this.last = null;
      let count = 0;

      for (const line of lines) {
        if (!line.trim()) continue;
        const parts = line.split(',');
        if (parts.length < 9) continue;

        const cur = new TimberNode({
          zone: parts[0],
          timberID: parts[1],
          kind: parts[2],
          weight: parts[3],
          status: parts[4],
          height: parts[5],
          quantity: parts[6],
          price: parts[7],
          cutDate: parts[8],
        });

        if (this.first === null) {
          this.first = this.last = cur;
        } else {
          this.last.next = cur;
          this.last = cur;
        }
        count++;
      }

      if (count === 0) {
        return {
          success: false,
          message: 'No valid records found in backup data.',
        };
      }

      return {
        success: true,
        message: 'Data successfully restored from timberdata.txt',
        count,
      };
    } catch (e) {
      return {
        success: false,
        message: 'Error restoring data: ' + e.message,
      };
    }
  }
}

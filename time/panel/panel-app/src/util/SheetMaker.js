
import { utils, writeFile } from "xlsx"
class SheetMaker {

  static makeWorkbook(punchesObj) {
    const workbook = utils.book_new();
    const sheetPunches = utils.json_to_sheet(punchesObj);
    utils.book_append_sheet(workbook, sheetPunches, "Punches");
    const data = writeFile(workbook, "punches.xlsx");
    return data;
  }
}

export default SheetMaker;
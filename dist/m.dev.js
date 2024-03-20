"use strict";

function loading() {
  return regeneratorRuntime.async(function loading$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise(function _callee(res) {
            var percent, line, totalSymbols, completedSymbols, remainingSymbols;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    percent = 0;
                    line = "______________________________";
                    totalSymbols = 30;

                  case 3:
                    if (!true) {
                      _context.next = 17;
                      break;
                    }

                    _context.next = 6;
                    return regeneratorRuntime.awrap(new Promise(function (res) {
                      return setTimeout(res, 50);
                    }));

                  case 6:
                    percent++;
                    completedSymbols = Math.floor(percent / 100 * totalSymbols);
                    remainingSymbols = totalSymbols - completedSymbols;
                    line = "#".repeat(completedSymbols) + "_".repeat(remainingSymbols);
                    process.stdout.write("\r".concat(line, " (").concat(percent, "%)"));

                    if (!(percent === 100)) {
                      _context.next = 15;
                      break;
                    }

                    process.stdout.write("\n");
                    res(true);
                    return _context.abrupt("break", 17);

                  case 15:
                    _context.next = 3;
                    break;

                  case 17:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function initialize() {
  return regeneratorRuntime.async(function initialize$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(loading());

        case 2:
          _context3.next = 4;
          return regeneratorRuntime.awrap(loading());

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}

initialize();
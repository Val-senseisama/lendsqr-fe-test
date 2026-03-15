import { describe, it, expect } from "vitest";
import { Validate } from "./Validate";

// ─── email ────────────────────────────────────────────────────────────────────
describe("Validate.email", () => {
  describe("positive", () => {
    it("accepts a standard email", () => {
      expect(Validate.email("user@example.com")).toBe(true);
    });
    it("accepts email with sub-domain", () => {
      expect(Validate.email("user@mail.example.com")).toBe(true);
    });
    it("accepts email with plus tag", () => {
      expect(Validate.email("user+tag@example.org")).toBe(true);
    });
    it("accepts email with numeric local part", () => {
      expect(Validate.email("123@domain.io")).toBe(true);
    });
  });

  describe("negative", () => {
    it("rejects string without @", () => {
      expect(Validate.email("notanemail")).toBe(false);
    });
    it("rejects string with missing TLD", () => {
      expect(Validate.email("user@domain")).toBe(false);
    });
    it("rejects string with no local part", () => {
      expect(Validate.email("@domain.com")).toBe(false);
    });
    it("rejects empty string", () => {
      expect(Validate.email("")).toBe(false);
    });
    it("rejects email with spaces", () => {
      expect(Validate.email("user @example.com")).toBe(false);
    });
  });
});

// ─── URL ──────────────────────────────────────────────────────────────────────
describe("Validate.URL", () => {
  describe("positive", () => {
    it("accepts http URL", () => {
      expect(Validate.URL("http://example.com")).toBe(true);
    });
    it("accepts https URL", () => {
      expect(Validate.URL("https://example.com/path?q=1")).toBe(true);
    });
    it("accepts ftp URL", () => {
      expect(Validate.URL("ftp://files.example.com")).toBe(true);
    });
  });

  describe("negative", () => {
    it("rejects URL without protocol", () => {
      expect(Validate.URL("example.com")).toBe(false);
    });
    it("rejects empty string", () => {
      expect(Validate.URL("")).toBe(false);
    });
    it("rejects URL with space", () => {
      expect(Validate.URL("https://exa mple.com")).toBe(false);
    });
    it("rejects plain text", () => {
      expect(Validate.URL("just text")).toBe(false);
    });
  });
});

// ─── phone ────────────────────────────────────────────────────────────────────
describe("Validate.phone", () => {
  describe("positive", () => {
    it("accepts an all-digit string", () => {
      expect(Validate.phone("08012345678")).toBe(true);
    });
    it("accepts a single digit", () => {
      expect(Validate.phone("0")).toBe(true);
    });
  });

  describe("negative", () => {
    it("rejects a string with dashes", () => {
      expect(Validate.phone("080-1234-5678")).toBe(false);
    });
    it("rejects a string with plus sign", () => {
      expect(Validate.phone("+2348012345678")).toBe(false);
    });
    it("rejects alphabetic characters", () => {
      expect(Validate.phone("0801abc")).toBe(false);
    });
    it("rejects empty string", () => {
      expect(Validate.phone("")).toBe(false);
    });
  });
});

// ─── integer ──────────────────────────────────────────────────────────────────
describe("Validate.integer", () => {
  describe("positive", () => {
    it("accepts zero", () => {
      expect(Validate.integer(0)).toBe(true);
    });
    it("accepts positive integer", () => {
      expect(Validate.integer(42)).toBe(true);
    });
    it("accepts negative integer", () => {
      expect(Validate.integer(-10)).toBe(true);
    });
  });

  describe("negative", () => {
    it("rejects a float", () => {
      expect(Validate.integer(3.14)).toBe(false);
    });
    it("rejects a string", () => {
      expect(Validate.integer("5")).toBe(false);
    });
    it("rejects NaN", () => {
      expect(Validate.integer(NaN)).toBe(false);
    });
    it("rejects Infinity", () => {
      expect(Validate.integer(Infinity)).toBe(false);
    });
  });
});

// ─── positiveInteger ─────────────────────────────────────────────────────────
describe("Validate.positiveInteger", () => {
  describe("positive", () => {
    it("accepts zero", () => {
      expect(Validate.positiveInteger(0)).toBe(true);
    });
    it("accepts positive integer", () => {
      expect(Validate.positiveInteger(100)).toBe(true);
    });
  });

  describe("negative", () => {
    it("rejects a negative integer", () => {
      expect(Validate.positiveInteger(-1)).toBe(false);
    });
    it("rejects a float", () => {
      expect(Validate.positiveInteger(1.5)).toBe(false);
    });
    it("rejects NaN", () => {
      expect(Validate.positiveInteger(NaN)).toBe(false);
    });
  });
});

// ─── float ────────────────────────────────────────────────────────────────────
describe("Validate.float", () => {
  describe("positive", () => {
    it("accepts an integer (integers are finite)", () => {
      expect(Validate.float(5)).toBe(true);
    });
    it("accepts a decimal number", () => {
      expect(Validate.float(3.14)).toBe(true);
    });
    it("accepts a negative float", () => {
      expect(Validate.float(-0.5)).toBe(true);
    });
    it("accepts zero", () => {
      expect(Validate.float(0)).toBe(true);
    });
  });

  describe("negative", () => {
    it("rejects Infinity", () => {
      expect(Validate.float(Infinity)).toBe(false);
    });
    it("rejects negative Infinity", () => {
      expect(Validate.float(-Infinity)).toBe(false);
    });
    it("rejects NaN", () => {
      expect(Validate.float(NaN)).toBe(false);
    });
  });
});

// ─── string ───────────────────────────────────────────────────────────────────
describe("Validate.string", () => {
  describe("positive", () => {
    it("accepts a regular word", () => {
      expect(Validate.string("hello")).toBe(true);
    });
    it("accepts a string with spaces inside", () => {
      expect(Validate.string("hello world")).toBe(true);
    });
  });

  describe("negative", () => {
    it("rejects empty string", () => {
      expect(Validate.string("")).toBe(false);
    });
    it("rejects whitespace-only string", () => {
      expect(Validate.string("   ")).toBe(false);
    });
    it("rejects a number", () => {
      expect(Validate.string(42 as unknown as string)).toBe(false);
    });
    it("rejects null", () => {
      expect(Validate.string(null as unknown as string)).toBe(false);
    });
  });
});

// ─── array ────────────────────────────────────────────────────────────────────
describe("Validate.array", () => {
  describe("positive", () => {
    it("accepts a non-empty array", () => {
      expect(Validate.array([1, 2, 3])).toBe(true);
    });
    it("accepts array with a single element", () => {
      expect(Validate.array(["x"])).toBe(true);
    });
  });

  describe("negative", () => {
    it("rejects empty array", () => {
      expect(Validate.array([])).toBe(false);
    });
    it("rejects a plain object", () => {
      expect(Validate.array({} as unknown as unknown[])).toBe(false);
    });
    it("rejects a string", () => {
      expect(Validate.array("abc" as unknown as unknown[])).toBe(false);
    });
    it("rejects null", () => {
      expect(Validate.array(null as unknown as unknown[])).toBe(false);
    });
  });
});

// ─── object ───────────────────────────────────────────────────────────────────
describe("Validate.object", () => {
  describe("positive", () => {
    it("accepts a non-empty object", () => {
      expect(Validate.object({ a: 1 })).toBe(true);
    });
    it("accepts nested object", () => {
      expect(Validate.object({ nested: { key: "val" } })).toBe(true);
    });
  });

  describe("negative", () => {
    it("rejects empty object", () => {
      expect(Validate.object({})).toBe(false);
    });
    it("rejects null", () => {
      expect(Validate.object(null as unknown as object)).toBe(false);
    });
    it("accepts a non-empty array (arrays are objects in JS — implementation does not exclude them)", () => {
      // typeof [] === 'object' && [].length > 0 → Validate.object returns true
      // This documents the current behaviour; array exclusion would require Array.isArray check
      expect(Validate.object([1, 2] as unknown as object)).toBe(true);
    });
    it("rejects a string", () => {
      expect(Validate.object("str" as unknown as object)).toBe(false);
    });
  });
});

// ─── date ─────────────────────────────────────────────────────────────────────
describe("Validate.date", () => {
  describe("positive", () => {
    it("accepts a valid YYYY-MM-DD date", () => {
      expect(Validate.date("2024-06-15")).toBe(true);
    });
    it("accepts the first day of the year", () => {
      expect(Validate.date("2024-01-01")).toBe(true);
    });
  });

  describe("negative", () => {
    it("rejects DD-MM-YYYY format", () => {
      expect(Validate.date("15-06-2024")).toBe(false);
    });
    it("rejects an impossible month (13)", () => {
      expect(Validate.date("2024-13-01")).toBe(false);
    });
    it("rejects a plain string", () => {
      expect(Validate.date("not-a-date")).toBe(false);
    });
    it("rejects empty string", () => {
      expect(Validate.date("")).toBe(false);
    });
    it("rejects ISO datetime string", () => {
      expect(Validate.date("2024-06-15T00:00:00.000Z")).toBe(false);
    });
  });
});

// ─── time ─────────────────────────────────────────────────────────────────────
describe("Validate.time", () => {
  describe("positive", () => {
    it("accepts midnight 00:00", () => {
      expect(Validate.time("00:00")).toBe(true);
    });
    it("accepts end of day 23:59", () => {
      expect(Validate.time("23:59")).toBe(true);
    });
    it("accepts midday 12:30", () => {
      expect(Validate.time("12:30")).toBe(true);
    });
  });

  describe("negative", () => {
    it("rejects hour 24", () => {
      expect(Validate.time("24:00")).toBe(false);
    });
    it("rejects minute 60", () => {
      expect(Validate.time("12:60")).toBe(false);
    });
    it("rejects 12-hour format with am/pm", () => {
      expect(Validate.time("12:00pm")).toBe(false);
    });
    it("rejects empty string", () => {
      expect(Validate.time("")).toBe(false);
    });
  });
});

// ─── formatPhone ──────────────────────────────────────────────────────────────
describe("Validate.formatPhone", () => {
  describe("positive", () => {
    it("converts local 0-prefix to international format", () => {
      expect(Validate.formatPhone("08012345678")).toBe("2348012345678");
    });
    it("passes through already-prefixed 234 number", () => {
      expect(Validate.formatPhone("2348012345678")).toBe("2348012345678");
    });
    it("converts bare 10-digit number starting with 7/8/9", () => {
      expect(Validate.formatPhone("8012345678")).toBe("2348012345678");
    });
    it("strips spaces before processing", () => {
      expect(Validate.formatPhone("0801 234 5678")).toBe("2348012345678");
    });
    it("strips dashes before processing", () => {
      expect(Validate.formatPhone("0801-234-5678")).toBe("2348012345678");
    });
    it("strips parentheses and plus sign", () => {
      expect(Validate.formatPhone("+234(801)2345678")).toBe("2348012345678");
    });
    it("strips IDD 009 prefix, leaving the international number", () => {
      // "0092348012345678".slice(3) → "2348012345678" (234-prefixed international form)
      expect(Validate.formatPhone("0092348012345678")).toBe("2348012345678");
    });
  });

  describe("negative / passthrough", () => {
    it("returns unrecognised format as-is after stripping special chars", () => {
      // e.g. a random string that doesn't match any known pattern
      const result = Validate.formatPhone("12345");
      expect(result).toBe("12345"); // no transformation, just returned
    });
    it("returns empty string for empty input", () => {
      expect(Validate.formatPhone("")).toBe("");
    });
  });
});

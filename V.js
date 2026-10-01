'use strict';

/**
 * Haamu V1 monolith.
 *
 * Classes are constructed in descending version order from top to bottom.
 * Classes remain parallel unless an explicit relationship is established.
 */
class V2 {
  static NAME = 'Haamu V2';
  static VERSION = '2';
  static STATE = 'under-construction';
}

class V1 {
  static NAME = 'Haamu V1';
  static VERSION = '1.0.0';
  static STATE = 'under-construction';
}

class V0 {
  static NAME = 'Haamu V0';
  static VERSION = '0';
  static STATE = 'scaffold';

  static VERSIONS = Object.create(null);

  static scaffold(version, construct) {
    this.VERSIONS[version] = construct;
    return construct;
  }
}

globalThis.V2 = V2;
globalThis.V1 = V1;
globalThis.V0 = V0;

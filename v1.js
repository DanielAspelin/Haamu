'use strict';

/**
 * Haamu V1 monolith.
 *
 * V1 is constructed class by class in semantic and dependency order.
 * V0 provides the nested scaffold boundary for preceding version lineages.
 */
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

class B2 {
  static NAME = 'Haamu B2';
  static STATE = 'under-construction';
}

class V1 {
  static NAME = 'Haamu V1';
  static VERSION = '1.0.0';
  static STATE = 'under-construction';
}

globalThis.V0 = V0;
globalThis.B2 = B2;
globalThis.V1 = V1;

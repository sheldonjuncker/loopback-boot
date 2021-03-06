"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/boot
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeocoderServiceProvider = void 0;
// A dummy service instance to make unit testing easier
const GeocoderSingleton = {
    geocode(address) {
        return Promise.resolve({ lat: 0, lng: 0 });
    },
};
class GeocoderServiceProvider {
    value() {
        return Promise.resolve(GeocoderSingleton);
    }
}
exports.GeocoderServiceProvider = GeocoderServiceProvider;
//# sourceMappingURL=service-provider.artifact.js.map
//# sourceMappingURL=/home/sheldon/elsewhere/loopback-next/packages/boot/dist/__tests__/fixtures/service-provider.artifact.js.map
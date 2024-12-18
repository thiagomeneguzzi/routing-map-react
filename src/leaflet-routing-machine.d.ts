import "leaflet";
import "leaflet-routing-machine";

// Extend the Leaflet library with Routing
declare module "leaflet" {
	namespace Routing {
		function control(options?: any): any;
	}
}

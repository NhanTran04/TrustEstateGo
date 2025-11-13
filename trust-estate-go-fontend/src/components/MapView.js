import * as React from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import Map, { Marker, Popup } from "react-map-gl/maplibre";

const MapView = ({ latitude, longitude, title, address }) => {
    const [showPopup, setShowPopup] = React.useState(false);
    const MAPTILER_KEY = "6Gx2Nay8bylVpxCnmWtI";

    if (!latitude || !longitude) {
        return (
            <div className="text-center text-muted p-3">
                Không có dữ liệu vị trí để hiển thị bản đồ.
            </div>
        );
    }

    return (
        <div className="rounded-4 overflow-hidden shadow-sm" style={{ height: "400px" }}>
            <Map
                initialViewState={{
                    latitude,
                    longitude,
                    zoom: 12,
                }}
                style={{ width: "100%", height: "100%" }}
                mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`}
            >
                <Marker
                    latitude={latitude}
                    longitude={longitude}
                    onClick={(e) => {
                        e.originalEvent.stopPropagation();
                        setShowPopup(true);
                    }}
                />

                {showPopup && (
                    <Popup
                        latitude={latitude}
                        longitude={longitude}
                        anchor="top"
                        onClose={() => setShowPopup(false)}
                        closeButton={true}
                        closeOnClick={false}
                    >
                        <div style={{ fontSize: "14px" }}>
                            <strong>{title}</strong>
                            <br />
                            {address}
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
};

export default MapView;

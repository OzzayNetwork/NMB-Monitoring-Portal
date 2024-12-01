// Initialize the map
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat:-1.4667449664608114, 
            lng: 36.953532488203706
        },
        zoom: 16,
    });

    // Create a GeoJSON layer for cadastral data
    const cadastralLayer = new google.maps.Data({
        map: map,
        clickable: true, // Enable default context menu
    });

    // Create a GeoJSON layer for the county cadastral layer
    const cadastralLayerCounty = new google.maps.Data({
        map: map,
    });
    

    // Load external GeoJSON file and add it to the map
   // fetch("js/kajiadoCadastral.json")

    //fetch("js/KisumuCadastralSample.json")
    fetch("assets/js/Noonkopirr.json") 
    // fetch("assets/js/KisumuCadastralSample2.json")

   // C:\My Projects\Levetot\Safaricom Revenu Projects\Safaricom\e-construction\js\KisumuCadastralSample.json
        .then((response) => response.json())
        .then((data) => {
            // Add cadastral data from the external file to the map
            cadastralLayer.addGeoJson(data);
            console.log(data.features[1] )
            console.log(data.features[0] )
            var total=0

            // Set up styling for "uncompliant" parcels
            cadastralLayer.setStyle(function (feature) {
                const status = feature.getProperty("Status");
                const payBal=feature.getProperty("CurrentBal");

                console.log("Total")
               

               
                // if(payBal<1){
                //     console.log("The owner has no arreas")
                    
                // }

                
                let styleOptions = {
                    fillColor: "green",
                    fillOpacity: 0.4,
                    strokeColor: "green",
                    strokeWeight: 2,
                };

                if (status && status.toLowerCase() === "uncompliant") {
                    styleOptions = {
                        fillColor: "red",
                        fillOpacity: 0.4,
                        strokeColor: "red",
                        strokeWeight: 2,
                    };
                }

                if(payBal>0){

                    styleOptions = {
                        fillColor: "red",
                        fillOpacity: 0.4,
                        strokeColor: "red",
                        strokeWeight: 2,
                    };

                    //console.log("The Current balance is KES" +payBal+ "")
                }



                if (status && status.toLowerCase() === "testing") {
                    styleOptions = {
                        fillColor: "yellow",
                        fillOpacity: 0.8,
                        strokeColor: "yellow",
                        strokeWeight: 2,
                    };
                }

               // alert(status)

                return styleOptions;
            });

            // Add a click event listener to the cadastralLayer
            cadastralLayer.addListener('mouseover', function (event) {
                const feature = event.feature;
                const Arrears = feature.getProperty("CurrentBal"); // Change to the actual property name
                //const lrNumber=feat

                if (Arrears) {
                    // Show the Arrears information
                    $("#follow-text").html(`Outstanding Arrears: <strong class='text-danger fw-bold'>KES ` + formatWithCommas(Arrears) + `</strong> <br> <span class="text-capitalize text-info">Click to View More</span>`).removeClass('d-none');
                } else {
                    $("#follow-text").html("No Arrears <br> <span class='text-info'>Click for More Information</span>").removeClass('d-none');
                }
            });

            cadastralLayer.addListener('click', function (event) {
                $("#follow-text").addClass('d-none');
                $('.map-detaisl-sider-btn').click()
                

                const feature = event.feature;
                const ownersname=feature.getProperty("Owner")
                console.log(ownersname)
                console.log(feature)


               $("#mapCanvas .owner-name").text(feature.getProperty("CustomerSu"))
                //console.log(feature.getProperty("UPN"))
                const Arrears = feature.getProperty("Arrears"); // Change to the actual property name
                const lrNumber = feature.getProperty("Parcel_No")
                $('.lr-no').text(lrNumber)
                const lat = event.latLng.lat(); // Get latitude of the clicked point
                const lng = event.latLng.lng(); // Get longitude of the clicked point
                const size = feature.getProperty("Area_Ha")
                const Block_Name = feature.getProperty("Block_Name")
                const UPN = feature.getProperty("UPN")

                const ZoneWardNa = feature.getProperty("ZoneWardNa")
                const MarketCent = feature.getProperty("Trading_Ce")
                const PhysicalAd = feature.getProperty("Physical_A")
                const SiteValue = feature.getProperty("SiteValue")
                const GroundRent = feature.getProperty("GroundRent")
                const LandRates = feature.getProperty("LandRates")
                const OtherCharg = feature.getProperty("OtherCharg")
                const TotalAnnua = feature.getProperty("Amount_Pai")
                const CurrentBal = feature.getProperty("CurrentBal")
                const subcoutyName= "-"
                const plot_no = feature.getProperty("Plot_No")

                if(CurrentBal>0){
                    $('.plot-status').addClass('alert-danger').addClass('border-danger').removeClass('border-success').removeClass('alert-success')
                    $('.balance-txt').addClass('text-danger').removeClass('text-success')

                }

                if(CurrentBal<1){
                    $('.plot-status').addClass('alert-success').addClass('border-success').removeClass('border-danger').removeClass('alert-danger')
                    $('.balance-txt').addClass('text-success').removeClass('text-danger')

                }

                $("#mapCanvas .block-name").text(Block_Name)
                $("#mapCanvas .plot-number").text(plot_no)
                $("#mapCanvas .upn").text(UPN)
                $("#mapCanvas .size").text(size+ " Ha")
                $("#mapCanvas .market").text(MarketCent)

                $("#mapCanvas .site-value").  text("KES " + formatWithCommas(SiteValue)+".00") 
                $("#mapCanvas .balances").  text("KES " + formatWithCommas(CurrentBal)+".00")  
                $("#mapCanvas .annual-charges").  text("KES " + formatWithCommas(TotalAnnua)+".00") 
                $("#mapCanvas .land-rate").  text("KES " + formatWithCommas(LandRates)+".00")  
                $("#mapCanvas .ground-rate").  text("KES " + formatWithCommas(GroundRent)+".00")  
                $("#mapCanvas .other-charges").  text("KES " + formatWithCommas(OtherCharg)+".00")  

               
                // subcoutyName=""
                $("#mapCanvas .location-details").text(subcoutyName+','+ZoneWardNa+','+MarketCent)    
                console.log(ZoneWardNa)        

               
                if(Block_Name===""){
                    Block_Name="-"
                }

                $('.blockName').text("Block Name. "+Block_Name+" Plot No. "+plot_no)
                $('.size').text(size)

                // Fetch the address based on coordinates
                getAddressFromCoordinates(lat, lng, function (address) {
                    $('.lr-no').text(lrNumber);
                    $('.the-clicked-address').text(address);



                    if (Arrears) {
                        // Show the Arrears information
                        $('.arrears').text("KES " + formatWithCommas(Arrears));
                    } else {
                        $('.arrears').text("KES 0.00");
                    }

                    //$('#percel-details').removeClass('left-100').siblings().addClass('left-100');
                   //$('.main-map-container .ma-backdrop').removeClass('d-none');
                   //$(".content, .header").append('<div class="ma-backdrop" data-ma-action="aside-close" data-ma-target=' + e + " />");
                });
            });

            // Add a mouseleave event listener to the cadastralLayer
            cadastralLayer.addListener('mouseout', function (event) {
                // Hide the follow-text div and perform any desired actions
                $("#follow-text").addClass('d-none');
                // alert("Mouse is out of the parcel");
            });
        })
        .catch((error) => {
            console.error("Error loading GeoJSON file:", error);
        });


    
}

// following mouse text
const followText = document.getElementById("follow-text");

document.addEventListener("mousemove", (e) => {
    // Get the current mouse position
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Set the position of the followText div to follow the mouse
    followText.style.left = mouseX + "px";
    followText.style.top = mouseY + "px";
});

function formatWithCommas(number) {
    // Convert the input to a number (if it's not already)
    const num = parseFloat(number);

    // Check if the input is a valid number
    if (isNaN(num)) {
        return "Invalid input";
    }

    // Use the toLocaleString() method to format the number with commas
    return num.toLocaleString();
}



$('.close-aside').on('click', function () {
    $(this).parent().parent().addClass('left-100');
    $('.ma-backdrop').addClass('d-none');
    // marker.setAnimation(null);
    removeMarkers();
});

$('.main-map-container .ma-backdrop').on('click', function () {
    $('.main-map-container aside').addClass('left-100');
    $(this).addClass('d-none');
});



// Function to fetch the address based on coordinates
function getAddressFromCoordinates(lat, lng, callback) {
    const geocoder = new google.maps.Geocoder();
    const latLng = new google.maps.LatLng(lat, lng);

    geocoder.geocode({
        'location': latLng
    }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                const formattedAddress = results[0].formatted_address;
                callback(formattedAddress);
            } else {
                callback("Address not found");
            }
        } else {
            callback("Geocoder failed due to: " + status);
        }
    });
}
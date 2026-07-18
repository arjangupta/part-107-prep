export type Lesson = {
  id: number;
  eyebrow: string;
  title: string;
  minutes: number;
  summary: string;
  objectives: string[];
  concepts: { label: string; value: string; note: string }[];
  sections: {
    title: string;
    lead: string;
    paragraphs: string[];
    points?: string[];
    example?: { label: string; text: string };
  }[];
  scenarios: {
    question: string;
    answer: string;
    reasoning: string[];
    trap: string;
  }[];
  traps: string[];
  recall: string[];
  takeaways: string[];
  sources: { label: string; href: string }[];
};

export const lessons: Lesson[] = [
  {
    id: 1,
    eyebrow: "Know the operating envelope",
    title: "Rules & pilot responsibilities",
    minutes: 42,
    summary: "Learn who may operate, what the remote PIC owns, the hard operating limits, required records and inspections, accident reporting, and how waivers differ from airspace authorizations.",
    objectives: [
      "Determine who may manipulate the controls and who remains accountable",
      "Apply Part 107 limits to realistic missions instead of memorizing isolated numbers",
      "Distinguish certificates, registration, Remote ID, waivers, and airspace authorizations",
      "Know what must happen before, during, and after an operation",
    ],
    concepts: [
      { label: "Maximum altitude", value: "400 ft AGL", note: "Or within 400 ft of a structure and no more than 400 ft above its uppermost limit." },
      { label: "Maximum groundspeed", value: "87 kt", note: "Equivalent to 100 mph. This is groundspeed, not indicated airspeed." },
      { label: "Minimum visibility", value: "3 SM", note: "Flight visibility is observed from the control station." },
      { label: "Cloud clearance", value: "500 below / 2,000 horizontal", note: "Both distances must be maintained." },
      { label: "Small UAS weight", value: "< 55 lb", note: "Aircraft plus everything onboard or attached." },
      { label: "Accident report", value: "Within 10 days", note: "For serious injury, loss of consciousness, or qualifying property damage." },
    ],
    sections: [
      {
        title: "When Part 107 applies",
        lead: "Part 107 is the default rule set for civil small-UAS operations that are not purely recreational and are not conducted under another specific authority.",
        paragraphs: [
          "The FAA looks at the purpose of the flight, not whether money changes hands. A roof inspection for your employer, imagery for a nonprofit, a test flight supporting product development, or a video intended to promote a business all fit naturally under Part 107. A flight may be recreational only when it is flown strictly for personal enjoyment and satisfies every condition of the recreational exception.",
          "A small unmanned aircraft must weigh less than 55 pounds at takeoff, including payload and attachments. At 55 pounds or more, Part 107 is not the applicable operating framework. Indoor flight is outside the National Airspace System, but the moment the aircraft operates outdoors the aviation rules matter.",
        ],
        points: [
          "Commercial purpose is a useful clue, but compensation is not the legal dividing line.",
          "The operation, aircraft, airspace, and pilot each have separate compliance requirements.",
          "Property-owner permission does not grant permission to use the airspace.",
        ],
        example: { label: "Apply it", text: "You volunteer to photograph storm damage for a charity. The lack of payment does not automatically make the flight recreational; its purpose is performing a service, so plan it as a Part 107 operation." },
      },
      {
        title: "Remote PIC authority and crew roles",
        lead: "The remote pilot in command is directly responsible for the operation and is the final authority as to it.",
        paragraphs: [
          "Only one person is the remote PIC at any moment. That person must hold a current remote pilot certificate, be able to direct the small UAS, ensure the operation complies with the rules, and decide whether the aircraft and conditions are safe. A certificated remote PIC may directly supervise another person manipulating the controls, but must remain able to take immediate direct control.",
          "A visual observer is optional in many operations. A VO helps see the aircraft, scan for traffic and hazards, and communicate with the remote PIC and person manipulating the controls. Using a VO does not transfer responsibility away from the remote PIC, and neither the remote PIC nor VO may serve more than one small-UAS operation at the same time.",
          "No person may act as remote PIC, VO, or manipulate the controls if they know or have reason to know of a physical or mental condition that would interfere with safe operation. Alcohol rules prohibit acting within 8 hours after drinking, while under the influence, with a blood alcohol concentration of 0.04% or greater, or while using a drug that affects safety.",
        ],
        points: [
          "Certificate must be readily accessible during the operation.",
          "Aeronautical knowledge recency is maintained every 24 calendar months.",
          "The remote PIC can deviate from Part 107 in an in-flight emergency only to the extent necessary to address it.",
        ],
      },
      {
        title: "The operating limits as a system",
        lead: "The test often gives you a mission that satisfies one limit and violates another. Run every scenario through the entire envelope.",
        paragraphs: [
          "Routine operations are limited to 400 feet above ground level. The structure exception permits flight higher than 400 feet AGL only when the aircraft remains within a 400-foot radius of a structure and does not fly more than 400 feet above the structure’s uppermost limit. This exception does not erase controlled-airspace ceilings or authorization conditions.",
          "The aircraft must remain within visual line of sight throughout the operation. The remote PIC, person manipulating the controls, or VO must be able to see it with vision unaided by devices other than corrective lenses and determine its location, attitude, direction, collision hazards, and whether limits are being exceeded. A brief glance at a display is compatible with VLOS; using a camera feed as the only means of seeing the aircraft is not.",
          "Day and night operations are permitted when their specific requirements are satisfied. At night, the remote PIC must have completed the applicable updated knowledge test or training and the aircraft must display anti-collision lighting visible for at least 3 statute miles. The PIC may reduce intensity when safety requires it.",
        ],
        points: [
          "Groundspeed: no more than 87 knots (100 mph).",
          "Visibility: at least 3 statute miles from the control station.",
          "Clouds: at least 500 feet below and 2,000 feet horizontally.",
          "Always yield right of way to all aircraft, airborne vehicles, and launch/reentry vehicles.",
          "No careless or reckless operation and no dropping objects in a manner that creates undue hazard.",
        ],
      },
      {
        title: "Preflight, records, reporting, and inspections",
        lead: "Part 107 expects a deliberate preflight process, not merely a battery check.",
        paragraphs: [
          "Before flight, the remote PIC must assess the operating environment. That includes local weather; local airspace and flight restrictions; the location of people and property; ground hazards; and any other condition that could affect safety. Everyone directly participating must be briefed on operating conditions, emergency procedures, contingency procedures, roles, responsibilities, and hazards.",
          "The remote PIC must ensure control links work correctly, enough power exists for the planned operation, attached objects are secure and do not adversely affect controllability, and the aircraft is in a condition for safe operation. There is no standard airworthiness certificate requirement for ordinary Part 107 aircraft, so this condition-for-safe-operation determination rests heavily on the remote PIC.",
          "Upon request, the remote PIC must present the remote pilot certificate and identification and make required documents, records, and the small UAS available to the FAA. Accidents must be reported to the FAA within 10 days when they cause serious injury, loss of consciousness, or property damage—excluding the aircraft itself—of at least $500 to repair or replace, whichever is lower.",
        ],
        example: { label: "Threshold trap", text: "A crash destroys a $1,200 drone and scratches a $300 vehicle panel. No report is triggered by property cost alone because damage to the drone is excluded and the other property damage is below $500." },
      },
      {
        title: "Waiver versus authorization",
        lead: "These solve different problems and are a favorite exam distinction.",
        paragraphs: [
          "An airspace authorization gives access to controlled airspace—Class B, C, D, or the surface area of Class E—under stated conditions. LAANC can provide near-real-time authorizations at participating facilities; FAADroneZone handles other requests. Authorization does not waive altitude, VLOS, weather, or other operational rules.",
          "A waiver permits deviation from a specific waivable Part 107 provision after the FAA determines the operation can be conducted safely. A waiver does not automatically authorize controlled airspace. A mission may need both. Read the actual waiver and authorization because each applies only to its stated provisions, geography, altitude, dates, and conditions.",
        ],
        points: [
          "Class G usually needs no airspace authorization, but all other Part 107 rules still apply.",
          "A client request, local permit, or landowner approval is neither an FAA waiver nor airspace authorization.",
          "Temporary flight restrictions and other prohibitions may still block an otherwise authorized operation.",
        ],
      },
    ],
    scenarios: [
      {
        question: "A client requests a mapping pass at 520 ft AGL over open Class G farmland. Visibility is 10 SM and the aircraft remains in sight. Is this a routine Part 107 operation?",
        answer: "No. It exceeds the routine 400-ft AGL limit and no structure exception applies.",
        reasoning: [
          "Class G answers only whether controlled-airspace authorization is needed.",
          "Check the separate altitude rule: open terrain gives no structure-based allowance.",
          "Good visibility and VLOS satisfy other limits but do not cure the altitude violation.",
          "The mission must be redesigned to 400 ft AGL or lower, or conducted under applicable FAA authority such as a waiver.",
        ],
        trap: "Treating Class G as unrestricted airspace.",
      },
      {
        question: "A 900-ft tower stands in Class G airspace. May you inspect its antenna at 1,150 ft AGL under routine Part 107?",
        answer: "Potentially yes, if you remain within 400 ft horizontally of the structure and no more than 400 ft above its uppermost limit, while satisfying every other rule.",
        reasoning: [
          "The tower’s top is 900 ft AGL.",
          "The requested 1,150 ft altitude is 250 ft above the top, within the 400-ft vertical allowance.",
          "Confirm the aircraft stays inside the 400-ft radius around the structure.",
          "Then check VLOS, weather, traffic, restrictions, and any other hazards.",
        ],
        trap: "Assuming 400 ft AGL is an absolute ceiling in every circumstance.",
      },
      {
        question: "Your unlicensed camera operator is manipulating the controls while you stand beside them. You become distracted taking a phone call. Is the arrangement compliant?",
        answer: "No. Direct supervision requires the certificated remote PIC to remain able to immediately take direct control.",
        reasoning: [
          "A non-certificated person may manipulate controls only under direct supervision.",
          "The remote PIC must be able to take immediate direct control.",
          "Disengaging from the operation defeats that condition even if the PIC remains physically nearby.",
        ],
        trap: "Confusing physical proximity with active direct supervision.",
      },
    ],
    traps: [
      "The 55-lb threshold includes payload and attachments.",
      "The 400-ft structure provision contains both a 400-ft radius and a 400-ft-above-the-top condition.",
      "VLOS is not satisfied by FPV alone; corrective lenses are allowed, binoculars are not the continuing means of compliance.",
      "The $500 reporting threshold excludes damage to the small UAS itself.",
      "A waiver changes only the cited provision; an authorization changes only controlled-airspace access.",
    ],
    recall: [
      "State the four core numeric limits without looking.",
      "Explain when an uncertificated person may manipulate the controls.",
      "Describe a mission that needs both a waiver and an airspace authorization.",
      "List the three accident-report triggers and the deadline.",
    ],
    takeaways: [
      "The remote PIC owns the whole operation, even when tasks are delegated.",
      "Test scenarios must be checked against every limit, not one favorable fact.",
      "Authorization, waiver, registration, certification, and Remote ID solve different compliance problems.",
    ],
    sources: [
      { label: "14 CFR Part 107", href: "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107" },
      { label: "FAA Part 107 overview", href: "https://www.faa.gov/newsroom/small-unmanned-aircraft-systems-uas-regulations-part-107" },
      { label: "AC 107-2A guidance", href: "https://www.faa.gov/regulations_policies/advisory_circulars/index.cfm/go/document.information/documentID/1038977" },
    ],
  },
  {
    id: 2,
    eyebrow: "Read the airspace before you launch",
    title: "Airspace, charts & restrictions",
    minutes: 48,
    summary: "Build a three-dimensional mental model of the National Airspace System, learn sectional-chart symbology, determine authorization needs, and recognize airports, obstacles, special-use airspace, TFRs, and NOTAMs.",
    objectives: [
      "Classify airspace at a specific point and altitude",
      "Read sectional boundaries, floors, ceilings, airport data, and obstacle symbols",
      "Choose between LAANC, DroneZone, or no authorization",
      "Combine chart information with current NOTAMs and flight restrictions",
    ],
    concepts: [
      { label: "Class B", value: "Solid blue", note: "Layered around the busiest airports; authorization required where it exists." },
      { label: "Class C", value: "Solid magenta", note: "Usually a core and shelf; chart numbers show ceiling over floor in hundreds of feet MSL." },
      { label: "Class D", value: "Dashed blue", note: "Typically begins at the surface around a towered airport." },
      { label: "Class E surface", value: "Dashed magenta", note: "Controlled to the surface; Part 107 authorization required." },
      { label: "Class E at 700 AGL", value: "Magenta vignette", note: "Fuzzy side faces the lower Class E area." },
      { label: "Class G", value: "Uncontrolled", note: "No ATC authorization, but Part 107 and restrictions still apply." },
    ],
    sections: [
      {
        title: "Airspace is a three-dimensional stack",
        lead: "A colored line tells you a lateral boundary; the floor and ceiling tell you whether your planned altitude is actually inside it.",
        paragraphs: [
          "Class B, C, and D generally surround towered airports. Class B resembles an upside-down wedding cake with individually tailored shelves. Class C commonly has a 5-NM core from the surface and a 10-NM shelf beginning above the surface, although charts—not memory—control. Class D usually begins at the surface and extends to a charted ceiling around a towered airport.",
          "Class E is controlled airspace that is not A, B, C, or D. It may begin at the surface, 700 ft AGL, 1,200 ft AGL, or another charted altitude. For a small-UAS pilot, authorization is required in the surface area of Class E designated for an airport. Class G fills the space below overlying controlled airspace.",
          "MSL is altitude above mean sea level; AGL is height above the local ground. Sectional shelves are normally expressed in MSL, while the routine Part 107 altitude limit is AGL. Convert carefully using field or terrain elevation.",
        ],
        example: { label: "Stack it", text: "A Class C shelf marked 40/15 extends from 1,500 ft MSL up to but not including 4,000 ft MSL. If terrain is 1,000 ft MSL and you fly at 300 ft AGL, you are at 1,300 ft MSL—below that shelf, though another airspace area may still apply." },
      },
      {
        title: "Decode the sectional systematically",
        lead: "Do not hunt for one symbol. Read the chart in a repeatable order.",
        paragraphs: [
          "First locate the exact site, then identify the airport and airspace boundaries around it. Next read floors and ceilings, terrain elevations, maximum elevation figures, obstacles, special-use airspace, and nearby navigation or airport data. Finally, consult current sources for NOTAMs and TFRs because a sectional is not a live operational picture.",
          "Airport symbols communicate runway type and services. Blue airports have control towers; magenta airports do not. A star above an airport symbol indicates a rotating beacon operating sunset to sunrise. Tick marks around the airport indicate fuel availability and services during normal working hours. Runway depictions and airport data can help predict manned-aircraft flows even when you are outside controlled airspace.",
          "Obstacle labels show the top elevation MSL with the height AGL in parentheses. A group obstacle symbol represents multiple obstacles. Obstacles 1,000 ft AGL or higher receive special emphasis. Maximum elevation figures are conservative values for each quadrangle and are not permission to fly to that altitude.",
        ],
        points: [
          "Solid blue: Class B boundary; solid magenta: Class C.",
          "Dashed blue: Class D; dashed magenta: Class E surface area.",
          "Blue vignette: Class E generally begins at 1,200 ft AGL; magenta vignette: generally 700 ft AGL.",
          "Numbers such as 100/40 mean ceiling 10,000 ft MSL and floor 4,000 ft MSL.",
        ],
      },
      {
        title: "Airports and traffic patterns",
        lead: "Authorization is an airspace issue; collision avoidance is always an operational issue.",
        paragraphs: [
          "Operating near an airport in Class G may not require FAA airspace authorization, but the remote PIC must avoid interfering with airport operations and must yield to all other aircraft. Know the runway orientation, likely traffic pattern, approach and departure paths, and locations where helicopters may operate below normal fixed-wing pattern altitude.",
          "A standard traffic pattern uses left turns unless right traffic is indicated. Typical components are upwind, crosswind, downwind, base, and final. Wind direction drives the active runway because aircraft generally take off and land into the wind. A runway numbered 18 is aligned approximately 180 degrees magnetic; its opposite end is runway 36.",
          "CTAF is used by pilots for traffic advisories at many non-towered airports. A small-UAS remote pilot should understand transmissions and local traffic without creating confusion. Radio use does not confer priority and does not substitute for seeing and avoiding aircraft.",
        ],
      },
      {
        title: "Authorization, LAANC, and UAS facility maps",
        lead: "Controlled-airspace access is permission with conditions, not a general clearance to fly.",
        paragraphs: [
          "LAANC connects approved service suppliers with FAA data to issue many low-altitude authorizations rapidly at participating airports. UAS Facility Maps show grid altitudes that indicate altitudes the FAA may approve more readily; they are not themselves authorizations and they do not guarantee approval.",
          "If LAANC is unavailable for the airport or the requested operation, use the FAA’s manual process. Read every authorization for maximum altitude, lateral boundaries, dates, times, coordination requirements, and other provisions. Night flight in controlled airspace still needs controlled-airspace authorization.",
          "Never call an air traffic control tower simply to request Part 107 airspace authorization. Use the FAA’s designated systems. In an emergency, ordinary emergency communications principles are different, but routine planning belongs in LAANC or the applicable FAA portal.",
        ],
      },
      {
        title: "Special-use airspace and live restrictions",
        lead: "The sectional begins the briefing; NOTAMs and TFRs finish it.",
        paragraphs: [
          "Prohibited areas contain airspace where flight is forbidden for security or national-welfare reasons. Restricted areas contain unusual, often invisible hazards such as artillery or aerial gunnery; operation may be permitted only when the controlling or using agency allows it. Warning areas are similar hazards over domestic or international waters. Military operations areas separate certain military training from IFR traffic; VFR flight is not automatically prohibited, but activity can be intense.",
          "Alert areas warn of high pilot-training activity or unusual aviation activity. Military training routes can contain fast, low-altitude aircraft. National security areas request avoidance and can become temporarily mandatory. Wildlife or other chart notes may impose or recommend further limits.",
          "Temporary Flight Restrictions can arise for disasters, major sporting events, presidential movement, space operations, firefighting, or security. NOTAMs also communicate runway closures, navigation outages, hazards, and changes. Because these are time-sensitive, check them close to departure and again if the mission is delayed.",
        ],
      },
    ],
    scenarios: [
      {
        question: "A Class C shelf is marked 42/16. Terrain elevation at your site is 1,250 ft MSL and you plan 300 ft AGL. Are you inside the shelf?",
        answer: "No. Your planned altitude is 1,550 ft MSL, 50 ft below the 1,600-ft MSL floor.",
        reasoning: [
          "Interpret 42/16 as a ceiling of 4,200 ft MSL over a floor of 1,600 ft MSL.",
          "Convert the flight altitude: 1,250 + 300 = 1,550 ft MSL.",
          "Compare 1,550 to the 1,600-ft floor.",
          "Then check whether a surface core or other controlled-airspace area covers the location.",
        ],
        trap: "Comparing a chart’s MSL shelf altitude directly with an AGL flight altitude.",
      },
      {
        question: "Your site is 2 NM from a non-towered magenta airport in Class G. May you launch without LAANC?",
        answer: "Possibly yes, because proximity alone does not create an authorization requirement in Class G—but only if you can operate without interfering with airport traffic and all other rules and restrictions are satisfied.",
        reasoning: [
          "Identify the airspace rather than applying a generic distance-from-airport rule.",
          "Class G normally requires no controlled-airspace authorization.",
          "Assess traffic patterns, approaches, helicopters, NOTAMs, and site-specific collision risk.",
          "Yield to every aircraft and do not interfere with airport operations.",
        ],
        trap: "Inventing a universal five-mile permission rule.",
      },
      {
        question: "A UAS Facility Map grid shows 200 ft at your site. Is that permission to fly at 200 ft?",
        answer: "No. It indicates an altitude that may be eligible for streamlined authorization; you still need an actual authorization before operating in the controlled airspace.",
        reasoning: [
          "Facility maps are planning data, not approvals.",
          "Submit through LAANC or the appropriate manual process.",
          "Operate only after approval and comply with the authorization’s exact conditions.",
        ],
        trap: "Treating a map grid altitude as an automatic clearance.",
      },
    ],
    traps: [
      "Chart shelf altitudes are generally MSL; Part 107’s 400-ft limit is AGL.",
      "Class E is not always authorization-required for a low-altitude drone; focus on surface-area Class E.",
      "An airport can sit in Class G and still present serious traffic risk.",
      "Facility-map numbers are not authorizations.",
      "A sectional cannot show a TFR issued after the chart was published.",
    ],
    recall: [
      "Draw and label the common Class C core and shelf.",
      "Explain a 40/15 shelf notation to another person.",
      "Name four live sources or restrictions checked after reading the sectional.",
      "Explain why a flight near an airport may be legal without authorization but still unsafe.",
    ],
    takeaways: [
      "Solve airspace in three dimensions using both MSL and AGL.",
      "Authorization depends on airspace; safe operation depends on traffic and hazards too.",
      "Always combine the sectional with current NOTAM and TFR information.",
    ],
    sources: [
      { label: "FAA Pilot’s Handbook: Airspace", href: "https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/phak" },
      { label: "FAA Aeronautical Chart User’s Guide", href: "https://www.faa.gov/air_traffic/flight_info/aeronav/digital_products/aero_guide/" },
      { label: "FAA LAANC", href: "https://www.faa.gov/uas/getting_started/laanc" },
    ],
  },
  {
    id: 3,
    eyebrow: "Translate weather into aircraft risk",
    title: "Weather, METARs & TAFs",
    minutes: 46,
    summary: "Understand the atmosphere well enough to predict performance and hazards, then decode weather reports and forecasts into a defensible go/no-go decision.",
    objectives: [
      "Explain pressure, temperature, moisture, stability, fronts, and thunderstorms",
      "Decode common METAR and TAF groups in sequence",
      "Predict density-altitude, wind, turbulence, icing, and visibility effects",
      "Separate legal weather minimums from prudent mission limits",
    ],
    concepts: [
      { label: "METAR", value: "Observation", note: "A coded report of observed surface weather, usually issued hourly." },
      { label: "TAF", value: "Forecast", note: "Expected conditions near a terminal for a stated validity period." },
      { label: "High density altitude", value: "Lower performance", note: "Hot, high, and low-pressure conditions reduce air density." },
      { label: "Stable air", value: "Smooth / low visibility", note: "Stratus, steady precipitation, haze, and poor dispersion are common." },
      { label: "Unstable air", value: "Turbulent / showery", note: "Cumuliform clouds, gusts, and good visibility between showers." },
      { label: "Thunderstorm stages", value: "3 stages", note: "Cumulus, mature, and dissipating; the mature stage is most hazardous." },
    ],
    sections: [
      {
        title: "Pressure, wind, and density altitude",
        lead: "Weather begins with uneven heating. Pressure differences create wind, and air density changes how much thrust and cooling margin your aircraft has.",
        paragraphs: [
          "Warm air expands and becomes less dense; cold air contracts and becomes denser. Pressure generally decreases with altitude. Wind flows in response to pressure gradients and is deflected by Earth’s rotation aloft, while surface friction slows it and turns it across isobars toward lower pressure.",
          "Density altitude is pressure altitude corrected for nonstandard temperature. High elevation, high temperature, low pressure, and—to a smaller degree—high humidity increase density altitude. In less-dense air, propellers move less mass, lift and thrust margins decrease, cooling may worsen, and a multirotor must command more power to hover.",
          "For small UAS, performance tables and manufacturer limits matter more than a generic formula. A flight that was comfortable at dawn can become marginal after temperature rises, especially with payload, aging batteries, or high terrain.",
        ],
        example: { label: "Mission consequence", text: "At a Denver-area site on a hot afternoon, the same aircraft and payload may require substantially more throttle than at sea level on a cool morning. Reduce payload or duration and preserve a larger battery reserve rather than assuming yesterday’s endurance." },
      },
      {
        title: "Stability, clouds, fog, and fronts",
        lead: "Stability predicts the character of the weather, not whether it is simply good or bad.",
        paragraphs: [
          "Stable air resists vertical motion. It tends to produce smooth flight, stratiform clouds, steady precipitation, haze, smoke, and reduced visibility. Unstable air supports vertical motion and tends to produce turbulence, gusty winds, cumuliform clouds, showery precipitation, and good visibility outside precipitation.",
          "Fog forms when air near the surface becomes saturated. Radiation fog favors clear nights, light wind, and moist ground as the surface cools. Advection fog occurs when moist air moves over a colder surface and can persist in stronger wind. Upslope fog forms as moist air is forced up rising terrain and cools.",
          "A cold front commonly brings a narrow band of more abrupt weather, wind shifts, turbulence, and potentially thunderstorms. A warm front more often produces widespread layered clouds, steady precipitation, and deteriorating visibility ahead of the surface boundary. An occluded front combines characteristics as a faster cold front overtakes a warm front.",
        ],
      },
      {
        title: "Thunderstorms, turbulence, and wind hazards",
        lead: "A small aircraft’s low mass makes gusts, rotor turbulence, and outflow especially consequential.",
        paragraphs: [
          "Thunderstorms need moisture, an unstable lapse rate, and a lifting mechanism. The cumulus stage is dominated by updrafts; the mature stage contains both strong updrafts and downdrafts and produces the most severe hazards; the dissipating stage is dominated by downdrafts but remains hazardous.",
          "Hazards extend well outside visible rain: severe turbulence, lightning, hail, strong surface gusts, wind shear, and rapidly changing visibility. Never use a small UAS to probe or work close to a thunderstorm. Outflow can arrive before precipitation.",
          "Mechanical turbulence forms when wind crosses buildings, trees, ridges, and other obstructions. The leeward side is often most turbulent, with effects extending downwind. Plan launch and recovery locations around the actual wind direction and avoid creating a return leg that exceeds the aircraft’s wind capability.",
        ],
        points: [
          "Gust spread is the difference between steady wind and peak gust.",
          "A strong headwind outbound becomes an easy return; a tailwind outbound can create a dangerous return.",
          "Wind at aircraft altitude may differ materially from the surface observation.",
          "Visible moisture and freezing temperatures create icing risk; small propellers and sensors have little tolerance.",
        ],
      },
      {
        title: "Decode a METAR from left to right",
        lead: "Treat the report as ordered fields, then translate each field into operational meaning.",
        paragraphs: [
          "A report such as METAR KICT 181653Z 18012G20KT 10SM -RA SCT025 BKN045 24/18 A2992 RMK AO2 reads: Wichita; observation on the 18th at 1653 UTC; wind from 180 degrees true at 12 knots gusting 20; visibility 10 statute miles; light rain; scattered clouds at 2,500 ft AGL and broken clouds at 4,500 ft AGL; temperature 24°C, dew point 18°C; altimeter 29.92 inches Hg.",
          "Cloud coverage abbreviations are SKC/CLR, FEW, SCT, BKN, and OVC. A ceiling is the lowest broken, overcast, or obscured layer—not a scattered layer. Temperature and dew point close together indicate high relative humidity and greater risk of fog or low clouds if cooling continues.",
          "Wind in METARs is referenced to true north; runway numbers and many operational headings use magnetic reference. VRB means variable direction. Calm is 00000KT. Visibility may include fractions such as 1/2SM. Weather intensity uses a minus for light, no sign for moderate, and plus for heavy.",
        ],
      },
      {
        title: "Read a TAF as a timeline",
        lead: "A TAF is not one condition; it is a sequence of expected windows and changes.",
        paragraphs: [
          "Begin with station, issue time, and validity period. The initial forecast applies until a change group. FM indicates a rapid change beginning at a specific time and replaces prior conditions. TEMPO describes temporary fluctuations expected for less than half the stated interval. PROB30 indicates a 30-percent probability.",
          "Convert UTC to local time correctly and account for the date crossing midnight. Then identify the worst relevant conditions during setup, flight, contingencies, and recovery—not merely the conditions at launch.",
          "METARs describe what was observed at a station; TAFs describe expected terminal-area conditions. Neither substitutes for observing your site. Compare multiple nearby stations, radar and forecasts as appropriate, then make a final on-site assessment.",
        ],
      },
    ],
    scenarios: [
      {
        question: "Decode: KSTL 181851Z 22014G24KT 4SM TSRA BKN020CB 29/23 A2980.",
        answer: "St. Louis, day 18 at 1851 UTC; wind 220° true at 14 kt gusting 24; 4 SM visibility; thunderstorm with moderate rain; broken cumulonimbus at 2,000 ft AGL; 29°C/23°C; altimeter 29.80.",
        reasoning: [
          "Read station and UTC observation time.",
          "Translate steady wind and gust spread: a 10-kt spread indicates significant variability.",
          "Visibility is legal above 3 SM, but only barely and thunderstorms dominate the risk.",
          "BKN020CB establishes a 2,000-ft ceiling with cumulonimbus.",
          "The correct operational decision is no-go despite visibility technically exceeding the Part 107 floor.",
        ],
        trap: "Treating a legal minimum as proof that conditions are safe.",
      },
      {
        question: "A TAF contains TEMPO 1820/1824 2SM TSRA BKN015CB during your planned 2130Z flight. What matters?",
        answer: "Temporary thunderstorm conditions are expected during the mission window; postpone or redesign rather than relying on the better prevailing forecast.",
        reasoning: [
          "The TEMPO window runs from 2000Z to 2400Z on the 18th.",
          "Your 2130Z flight falls inside it.",
          "Two-mile visibility is below the Part 107 minimum, and thunderstorms are independently unacceptable.",
          "TEMPO does not mean the hazard can be ignored; it means temporary fluctuations are expected.",
        ],
        trap: "Reading only the first line of a TAF.",
      },
      {
        question: "You launch downwind on a mapping route with 30% battery used at the turnaround. Why can that still be dangerous?",
        answer: "The return is into the wind and may require far more time and power, so distance—not merely battery percentage at halfway—can leave inadequate reserve.",
        reasoning: [
          "Outbound groundspeed was helped by the tailwind.",
          "Inbound groundspeed will fall and power demand may rise.",
          "Battery discharge is nonlinear near the end and wind can strengthen.",
          "Plan the difficult leg first and set a conservative turnaround trigger.",
        ],
        trap: "Assuming equal distance means equal energy.",
      },
    ],
    traps: [
      "A scattered layer is not a ceiling; broken and overcast layers are.",
      "METAR wind is true, while runway alignment is magnetic.",
      "High pressure alone does not guarantee good drone weather.",
      "Stable air may be smooth yet have poor visibility.",
      "The mature thunderstorm stage is most hazardous, but every stage demands avoidance.",
    ],
    recall: [
      "Decode a METAR aloud in field order.",
      "Explain FM, TEMPO, and PROB30 without notes.",
      "Predict how hot, high, humid, low-pressure conditions affect thrust and endurance.",
      "Name three fog types and the mechanism behind each.",
    ],
    takeaways: [
      "Weather knowledge is about predicting changes and aircraft consequences.",
      "Decode reports into a timeline, then compare them with observed site conditions.",
      "Legal minimums are floors; personal and manufacturer limits should be more conservative.",
    ],
    sources: [
      { label: "FAA Pilot’s Handbook: Weather", href: "https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/phak" },
      { label: "Aviation Weather Center", href: "https://aviationweather.gov/" },
      { label: "FAA Aviation Weather Handbook", href: "https://www.faa.gov/regulations_policies/handbooks_manuals/aviation" },
    ],
  },
  {
    id: 4,
    eyebrow: "Run the mission like a crew",
    title: "Operations, CRM & aeronautical decisions",
    minutes: 40,
    summary: "Turn regulations into a repeatable mission process using crew roles, communication, airport awareness, risk management, physiology, and disciplined responses to external pressure.",
    objectives: [
      "Build a complete preflight briefing and site survey",
      "Use CRM, PAVE, IMSAFE, and hazardous-attitude antidotes",
      "Recognize airport traffic and radio calls",
      "Make defensible go/no-go and continue/divert decisions",
    ],
    concepts: [
      { label: "PAVE", value: "Mission hazards", note: "Pilot, Aircraft, enVironment, External pressures." },
      { label: "IMSAFE", value: "Pilot fitness", note: "Illness, Medication, Stress, Alcohol, Fatigue, Emotion/Eating." },
      { label: "5P check", value: "Reassess", note: "Plan, Plane, Pilot, Passengers/participants, Programming." },
      { label: "CRM", value: "Use all resources", note: "People, equipment, procedures, and information." },
      { label: "CTAF", value: "Traffic awareness", note: "Common Traffic Advisory Frequency at many non-towered airports." },
      { label: "Sterile operation", value: "No distractions", note: "Protect launch, recovery, and high-workload moments." },
    ],
    sections: [
      {
        title: "Mission planning from objective to abort criteria",
        lead: "A professional operation begins by defining what success is and when the crew will stop.",
        paragraphs: [
          "Translate the client objective into an operating area, altitude, route, payload, duration, image or data requirement, and recovery plan. Identify people, roads, structures, power lines, electromagnetic interference, terrain, animals, launch surfaces, and access restrictions. Confirm airspace, weather, NOTAMs, TFRs, aircraft status, firmware or database needs, registration, Remote ID, and required approvals.",
          "Set objective limits before pressure builds: maximum sustained wind and gusts, minimum visibility, battery launch and landing thresholds, GPS or link-quality criteria, minimum standoff from people, and lost-link behavior. Choose alternate landing areas and establish what triggers a pause, return, immediate landing, or emergency response.",
          "Brief the crew using plain, closed-loop communication. Everyone should know who is remote PIC, who manipulates controls, who observes, which words trigger an immediate maneuver, where the aircraft will go on lost link, and how the crew responds to manned traffic or a person entering the area.",
        ],
        points: [
          "Brief normal route, contingencies, emergency landing areas, and termination criteria.",
          "Verify home point and return-to-home altitude for this site.",
          "Reassess after any delay, battery change, weather change, software change, or crew change.",
        ],
      },
      {
        title: "Crew resource management",
        lead: "CRM is the disciplined use of every available resource to reduce human error.",
        paragraphs: [
          "The remote PIC invites relevant observations and makes the final decision. A strong briefing gives the VO specific sectors and callouts rather than the vague instruction to watch the drone. Use unambiguous phrases such as ‘traffic, north, low, approaching’ and require acknowledgement when a safety-critical instruction is issued.",
          "Task saturation occurs when demand exceeds mental capacity. Symptoms include fixation, missed radio calls, skipped checklist items, and narrowed attention. Reduce workload: pause the mission, place the aircraft in a stable safe state, delegate non-control tasks, and work the highest-risk problem first.",
          "Automation supports but does not replace supervision. Verify programmed altitude references, geofences, route direction, obstacle assumptions, return behavior, and battery logic. Monitor whether the system is doing what you intended, not merely whether it reports a nominal status.",
        ],
        example: { label: "Automation surprise", text: "A generic 200-ft return-to-home setting may climb into a bridge overhead or remain below a tower on another site. ‘RTH configured’ is not enough; the value must match the actual environment." },
      },
      {
        title: "Aeronautical decision-making",
        lead: "Risk tools are prompts for judgment, not paperwork rituals.",
        paragraphs: [
          "PAVE scans Pilot, Aircraft, enVironment, and External pressures. IMSAFE focuses on pilot fitness: Illness, Medication, Stress, Alcohol, Fatigue, and Emotion/Eating. The 5P model—Plan, Plane, Pilot, Passengers or participants, and Programming—supports repeated reassessment as the mission evolves.",
          "Common hazardous attitudes are anti-authority (‘don’t tell me’), impulsivity (‘do it quickly’), invulnerability (‘it won’t happen to me’), macho (‘I can do it’), and resignation (‘what’s the use’). Their antidotes are: follow the rules; not so fast—think first; it could happen to me; taking chances is foolish; and I am not helpless.",
          "External pressure is often the risk multiplier. A customer waiting, sunset approaching, travel schedules, sunk setup time, or desire to complete one last pass can turn manageable hazards into an accident chain. Decide limits in advance and treat a no-go as a successful safety outcome.",
        ],
      },
      {
        title: "Airport awareness and radio literacy",
        lead: "You need to understand manned-aircraft behavior even when you never transmit.",
        paragraphs: [
          "Aircraft normally enter a standard left traffic pattern on a 45-degree angle to the downwind leg, then fly base and final. Helicopters may use different patterns and lower altitudes. Agricultural, medical, military, and public-safety aircraft may appear low and outside expected flows.",
          "A typical call identifies the airport, aircraft, position, altitude or intention, and repeats the airport name: ‘Gardner traffic, Cessna Five Six Alpha, five miles west, entering left downwind runway one-eight, Gardner.’ Listen for location and intent rather than trying to memorize syntax.",
          "Runway numbers are magnetic direction rounded to the nearest ten with the last zero removed. Runway 18 points approximately south; reciprocal runway 36 points north. Wind favors the runway most nearly aligned into it. Segmented circles, windsocks, tetrahedrons, and traffic-pattern indicators provide surface clues.",
        ],
      },
      {
        title: "Human performance",
        lead: "The pilot is part of the system and can degrade before noticing it.",
        paragraphs: [
          "Fatigue slows reaction, narrows attention, and impairs judgment. Medication risk includes both the condition being treated and side effects such as drowsiness. Stress can improve alertness at low levels but becomes harmful when it creates fixation or rushing. Carbon monoxide is odorless and colorless and can cause headache, dizziness, and impaired judgment.",
          "Vision at night relies more on rods away from the center of vision. Use off-center viewing, protect dark adaptation from bright white light, and scan slowly. Autokinesis can make a stationary light appear to move when stared at; maintain reference to multiple cues and avoid fixation.",
          "Hyperventilation can produce lightheadedness, tingling, and visual symptoms; slow controlled breathing is the response. Dehydration and heat stress reduce cognitive performance. The regulatory alcohol rule is a minimum—residual impairment can remain after the legal window.",
        ],
      },
    ],
    scenarios: [
      {
        question: "The customer says a helicopter is ‘probably miles away’ and asks for one final pass. Your VO reported it low and approaching. What do you do?",
        answer: "Immediately yield and place or land the UAS where it cannot interfere. Resume only after the hazard is positively resolved and the operation is reassessed.",
        reasoning: [
          "The VO supplied safety-critical traffic information.",
          "Small UAS must yield right of way and may not create a collision hazard.",
          "Customer urgency is an external pressure, not operational authority.",
          "The remote PIC decides whether and when the mission can safely resume.",
        ],
        trap: "Letting mission completion outrank an uncertain traffic conflict.",
      },
      {
        question: "After a firmware update, the route loads correctly and GPS is strong. Is that enough to launch?",
        answer: "No. Treat the software change as a configuration risk and verify control directions, failsafes, geofence, return behavior, battery logic, and a safe functional check.",
        reasoning: [
          "A displayed route verifies only part of the system.",
          "Updates can reset or change safety-critical parameters.",
          "Use a checklist and low-risk functional test before committing to the mission.",
        ],
        trap: "Equating nominal status indicators with complete system verification.",
      },
      {
        question: "You slept four hours, feel irritable, and took a new antihistamine, but weather is perfect. Which model exposes the problem?",
        answer: "IMSAFE flags medication, fatigue, and emotion; the correct decision may be to replace the pilot or postpone.",
        reasoning: [
          "Excellent environment does not cancel pilot risk.",
          "New medication may impair alertness even if the label seems familiar.",
          "Multiple human-factor hazards compound one another.",
        ],
        trap: "Applying PAVE only to weather and aircraft.",
      },
    ],
    traps: [
      "A visual observer is a resource, not the person who inherits PIC responsibility.",
      "Radio monitoring or transmission never gives a drone priority over other aircraft.",
      "Checklists do not replace judgment; judgment should not casually replace checklists.",
      "Automation errors often come from correct execution of an incorrect setting.",
      "External pressure is part of the risk assessment, not a reason to accept more risk.",
    ],
    recall: [
      "Brief a hypothetical VO using specific sectors and callouts.",
      "State all PAVE and IMSAFE elements.",
      "Match each hazardous attitude to its antidote.",
      "Describe a standard left traffic pattern and decode runway 27.",
    ],
    takeaways: [
      "Set abort criteria before the mission creates pressure to continue.",
      "Good CRM makes hazards easy to report and safety actions unambiguous.",
      "Reassess the pilot, aircraft, environment, and plan whenever conditions change.",
    ],
    sources: [
      { label: "FAA Pilot’s Handbook: ADM & airport operations", href: "https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/phak" },
      { label: "FAA Aeronautical Information Manual", href: "https://www.faa.gov/air_traffic/publications/atpubs/aim_html/" },
      { label: "FAA Risk Management Handbook", href: "https://www.faa.gov/regulations_policies/handbooks_manuals/aviation" },
    ],
  },
  {
    id: 5,
    eyebrow: "Protect the performance margin",
    title: "Loading, aerodynamics & performance",
    minutes: 38,
    summary: "Understand how weight, balance, density, batteries, lift, drag, bank angle, and environmental conditions reshape a small UAS mission.",
    objectives: [
      "Separate total-weight limits from center-of-gravity limits",
      "Explain lift, drag, stalls, load factor, and bank-angle consequences",
      "Predict payload, wind, temperature, elevation, and battery effects",
      "Create a performance plan with usable reserves",
    ],
    concepts: [
      { label: "Added weight", value: "More power", note: "Usually reduces climb, maneuver margin, and endurance." },
      { label: "CG outside limits", value: "Control risk", note: "A legal total weight can still be dangerously unbalanced." },
      { label: "60° level bank", value: "2 G", note: "Load factor doubles in a coordinated level turn." },
      { label: "Stall", value: "Critical AOA", note: "A wing stalls when critical angle of attack is exceeded, at any airspeed." },
      { label: "Cold battery", value: "Less output", note: "Cold increases internal resistance and reduces available power." },
      { label: "Reserve", value: "Plan, don’t hope", note: "Account for wind, go-around, diversion, degradation, and uncertainty." },
    ],
    sections: [
      {
        title: "Weight and center of gravity",
        lead: "Weight answers how much; center of gravity answers where.",
        paragraphs: [
          "Every component contributes a weight acting at an arm from a reference datum. Moment equals weight times arm, and center of gravity is total moment divided by total weight. Many consumer drones do not publish a formal loading table, but the physical principle still governs payload placement.",
          "An aft CG can reduce stability and control authority; a forward CG can require sustained control input and excess power. Lateral imbalance makes motors work unequally and can reduce control margin. Secure payloads so they cannot shift and ensure they do not obstruct sensors, cooling, propellers, antennas, or Remote ID performance.",
          "Remaining below 55 pounds only establishes that the aircraft is a small UAS. It does not demonstrate safe loading or compliance with the manufacturer’s maximum takeoff weight.",
        ],
        example: { label: "Moment", text: "A 2-lb payload placed 10 inches from the datum creates 20 lb-in of moment. Moving it to 15 inches creates 30 lb-in without changing total weight; balance changed even though the scale reading did not." },
      },
      {
        title: "Lift, drag, and angle of attack",
        lead: "The exam uses conventional aerodynamic concepts because they explain fixed-wing and multirotor performance limits.",
        paragraphs: [
          "Lift acts perpendicular to the relative wind; drag acts parallel and opposite. Weight acts toward Earth; thrust propels the aircraft. Angle of attack is the angle between the wing chord line and relative wind. A stall occurs when critical angle of attack is exceeded, regardless of airspeed, attitude, or power.",
          "Induced drag is associated with producing lift and dominates at low speed and high angle of attack. Parasite drag grows rapidly with speed. The total-drag curve combines them and has a minimum region associated with efficient flight.",
          "A multirotor tilts its total thrust vector to accelerate horizontally. The vertical component must still oppose weight, so more total thrust is required to hold altitude while tilted. Strong wind, aggressive maneuvering, payload, and high density altitude can consume the available margin.",
        ],
      },
      {
        title: "Turns and load factor",
        lead: "Banking redistributes lift and increases the total lift required to maintain altitude.",
        paragraphs: [
          "In a level coordinated turn, part of lift acts horizontally to turn the aircraft and the vertical component must still equal weight. The aircraft therefore needs more total lift, increasing load factor. At 60 degrees of bank, load factor is 2 G.",
          "Stall speed rises with the square root of load factor. A wing that stalls at 30 knots at 1 G would stall at about 42 knots at 2 G. Small UAS autopilots may hide the control work, but they cannot repeal the aerodynamic demand.",
          "Abrupt maneuvering in gusts compounds aerodynamic loads. Respect manufacturer limits and avoid aggressive inputs when heavily loaded or operating near environmental limits.",
        ],
      },
      {
        title: "Battery and propulsion performance",
        lead: "Displayed battery percentage is an estimate, not a tank gauge.",
        paragraphs: [
          "Lithium batteries experience voltage sag under load. Cold temperature, high current, age, damage, poor storage, imbalance, and repeated deep discharge reduce usable performance. A battery can show acceptable resting voltage and collapse during a demanding climb or gust response.",
          "Inspect for swelling, puncture, damaged leads, contamination, unusual heat, and cell imbalance. Use manufacturer-compatible charging and storage practices. Allow hot batteries to cool before charging and isolate a damaged battery according to safe procedures.",
          "Build reserve around energy, not distance. Wind direction, terrain, payload, loiter time, route changes, and an alternate landing all affect the return. Establish conservative warning and landing thresholds from flight data and manufacturer guidance.",
        ],
      },
      {
        title: "Performance planning",
        lead: "Combine aircraft data with today’s configuration and environment.",
        paragraphs: [
          "Start with takeoff weight and payload placement. Add elevation, temperature, wind and gusts, precipitation or contamination, route direction, obstacle clearance, expected maneuvering, and battery condition. Compare each factor with manufacturer specifications and operational experience.",
          "Hover or conduct a short functional check in a safe area after configuration changes. Look for abnormal vibration, motor loading, drift, sensor warnings, control asymmetry, link quality, and battery sag. A successful check does not authorize exceeding published limits, but it can reveal defects before exposure grows.",
          "Plan the highest-demand phase: takeoff from confinement, climb over terrain, an upwind return, sustained hover, or recovery with limited landing options. Preserve margin for uncertainty rather than designing the mission around the average case.",
        ],
      },
    ],
    scenarios: [
      {
        question: "A new payload keeps total weight below the aircraft maximum but sits several inches aft and left. Can you rely on the autopilot to compensate?",
        answer: "No. Verify the configuration is within manufacturer loading limits, secure it, and assess CG and lateral balance before flight.",
        reasoning: [
          "Maximum weight and balance are separate constraints.",
          "Autopilot compensation consumes motor and control authority.",
          "Unequal loading can shorten endurance and reduce gust response.",
          "A safe functional check follows—not replaces—the loading determination.",
        ],
        trap: "Assuming automatic stabilization makes CG irrelevant.",
      },
      {
        question: "Why does a steep level turn reduce performance margin even if altitude and speed appear constant?",
        answer: "The aircraft must generate more total lift to preserve the vertical component, increasing load factor, power demand, and stall speed for a winged aircraft.",
        reasoning: [
          "Bank tilts the lift vector.",
          "Vertical lift must still equal weight for level flight.",
          "Total lift therefore increases.",
          "Higher aerodynamic and propulsion demand leaves less margin for gusts or further maneuvering.",
        ],
        trap: "Believing constant altitude means forces did not increase.",
      },
      {
        question: "A battery reads 55% when you begin an upwind return. Voltage drops sharply during climb. What is the right interpretation?",
        answer: "Percentage alone overstated usable margin; reduce demand and land safely at the nearest suitable area rather than forcing the original recovery plan.",
        reasoning: [
          "Upwind flight and climb increase current demand.",
          "Cold, age, or battery condition may cause voltage sag.",
          "Continuing toward a distant home point can turn a warning into power loss.",
          "Use the prebriefed alternate and inspect the battery before reuse.",
        ],
        trap: "Treating state-of-charge percentage as guaranteed endurance.",
      },
    ],
    traps: [
      "Below 55 lb does not mean below the manufacturer’s maximum takeoff weight.",
      "A stall is caused by exceeding critical angle of attack, not by one fixed airspeed.",
      "Steep bank raises load factor only when the aircraft maintains altitude.",
      "Hot air and high terrain both reduce density and propulsion performance.",
      "Payload placement can matter as much as payload mass.",
    ],
    recall: [
      "Explain weight, arm, moment, and center of gravity.",
      "Describe why a multirotor needs more thrust while tilted.",
      "State load factor at a 60-degree level bank and its effect on stall speed.",
      "List six factors that can reduce usable battery performance.",
    ],
    takeaways: [
      "Plan weight and balance separately.",
      "Automation masks control effort but not aerodynamic or power limits.",
      "Reserve must cover the hardest plausible return, not the easiest outbound leg.",
    ],
    sources: [
      { label: "FAA Pilot’s Handbook: Weight, performance & aerodynamics", href: "https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/phak" },
      { label: "FAA Remote Pilot Study Guide", href: "https://www.faa.gov/regulations_policies/handbooks_manuals/aviation" },
      { label: "AC 107-2A guidance", href: "https://www.faa.gov/regulations_policies/advisory_circulars/index.cfm/go/document.information/documentID/1038977" },
    ],
  },
  {
    id: 6,
    eyebrow: "Be ready when the plan changes",
    title: "Emergencies, night, people & Remote ID",
    minutes: 45,
    summary: "Prepare for abnormal events, understand emergency authority and reporting, operate safely at night, and apply the distinct requirements for Remote ID and operations over people or moving vehicles.",
    objectives: [
      "Prioritize actions during flyaway, lost link, low battery, and traffic conflicts",
      "Apply night-training, lighting, and visual-illusion requirements",
      "Distinguish the four operations-over-people categories",
      "Choose a Remote ID compliance method and recognize its limitations",
    ],
    concepts: [
      { label: "Emergency priority", value: "Aviate, avoid, act", note: "Maintain control, protect people and aircraft, then troubleshoot and communicate." },
      { label: "Emergency deviation", value: "Only as needed", note: "Deviation from Part 107 must be limited to addressing the in-flight emergency." },
      { label: "Night lighting", value: "Visible 3 SM", note: "Anti-collision lighting may be dimmed when safety requires." },
      { label: "Category 1", value: "≤ 0.55 lb", note: "Exposed rotating parts must not lacerate human skin." },
      { label: "Remote ID", value: "Broadcast compliance", note: "Standard, broadcast module, or operation within a FRIA as applicable." },
      { label: "FRIA", value: "Limited location", note: "Aircraft without Remote ID equipment may operate there within VLOS." },
    ],
    sections: [
      {
        title: "Emergency priorities and authority",
        lead: "The first objective is not saving the aircraft; it is preventing injury and collision.",
        paragraphs: [
          "When control or navigation degrades, stabilize or command the safest predictable state available. Yield to other aircraft, avoid people and critical property, execute the briefed contingency, and communicate clear assignments. Troubleshooting comes after immediate flight-path risk is controlled.",
          "The remote PIC may deviate from Part 107 during an in-flight emergency requiring immediate action, but only to the extent necessary. If the FAA requests a written report about the deviation, the PIC must provide it. Poor planning does not turn a predictable situation into unlimited emergency authority.",
          "After the event, secure batteries and wreckage safely, preserve logs, document facts, and determine whether the Part 107 accident-reporting threshold was met. Separate FAA reporting from any local emergency, law-enforcement, insurance, or organizational notification.",
        ],
      },
      {
        title: "Lost link, flyaway, and battery events",
        lead: "Contingencies must be configured for the site before takeoff.",
        paragraphs: [
          "Lost-link behavior may hover, land, return home, continue a route, or follow other logic. Choose deliberately. Return altitude must clear appropriate obstacles without violating an overhead constraint; automatic landing must not descend into people, traffic, water, or inaccessible terrain.",
          "For a flyaway, note last known position, altitude, heading, battery, and programmed behavior. Warn crew and affected people, monitor air traffic, use available termination or recovery functions only when they reduce overall risk, and notify appropriate authorities if the aircraft can create an aviation hazard.",
          "A low-battery response should prioritize the nearest suitable landing, not pride in returning to the launch pad. Avoid a high-power climb or long upwind leg if a controlled nearby landing reduces exposure.",
        ],
        points: [
          "Brief who watches the aircraft and who handles calls or ground control.",
          "Preselect alternate landing areas.",
          "Test failsafe behavior in controlled conditions before relying on it operationally.",
          "Do not chase a flyaway in a vehicle while simultaneously acting as remote PIC.",
        ],
      },
      {
        title: "Night operations and visual limitations",
        lead: "Night changes perception, orientation, and hazard detection even when the aircraft’s camera looks bright.",
        paragraphs: [
          "Routine Part 107 night operation requires the remote PIC to have completed the applicable updated initial knowledge test or recurrent training and the aircraft to have anti-collision lighting visible for at least 3 statute miles. The PIC may reduce intensity when operating conditions make that safer. Controlled airspace authorization remains required where applicable.",
          "Rods support dim-light and peripheral vision; cones provide color and central detail. Dark adaptation takes time and is quickly degraded by bright light. Use off-center viewing for faint objects, scan rather than stare, and protect the crew from unnecessary white light.",
          "Autokinesis makes a stationary light appear to move when viewed against a dark background. False horizons, featureless terrain, glare, and loss of depth cues can mislead orientation. Maintain multiple references and conservative standoff from obstacles and people.",
        ],
      },
      {
        title: "Operations over people and moving vehicles",
        lead: "The categories are aircraft-and-operation requirements, not simply pilot declarations.",
        paragraphs: [
          "Category 1 aircraft weigh 0.55 lb or less including everything attached and contain no exposed rotating parts that would lacerate skin. Categories 2 and 3 require FAA-accepted declarations of compliance and labeled aircraft meeting injury-severity and design requirements. Category 4 uses an eligible aircraft with an airworthiness certificate and operating limitations.",
          "Sustained flight over open-air assemblies has additional Remote ID requirements. Category 3 is more restrictive and generally cannot involve sustained flight over open-air assemblies; operations over people are limited to a closed or restricted-access site with notice, or situations where people are under a covered structure or inside a stationary vehicle that provides reasonable protection.",
          "Operations over moving vehicles are allowed only under the applicable category and conditions. The operation may occur over a closed or restricted-access site with occupants on notice, or the aircraft must not maintain sustained flight over moving vehicles. Never reduce this topic to ‘Part 107 allows flight over people now.’",
        ],
      },
      {
        title: "Remote ID",
        lead: "Remote ID is a separate operational requirement from registration and the remote pilot certificate.",
        paragraphs: [
          "A Standard Remote ID drone broadcasts identification and location information from takeoff through shutdown. A Remote ID broadcast module can be attached to a non-standard aircraft, but the person manipulating the controls must keep the aircraft within visual line of sight and the module’s serial number is used in registration.",
          "An aircraft without Remote ID equipment may operate within an FAA-Recognized Identification Area when the aircraft and pilot remain within VLOS and the aircraft stays inside the FRIA. A FRIA is a geographic area requested by eligible organizations; it is not a general exception that a pilot can create.",
          "Check equipment status before launch. If required Remote ID stops working in flight, follow the applicable rule and safe procedure rather than treating the mission as automatically unaffected. Remote ID compliance does not grant airspace access or permission to fly over people.",
        ],
      },
      {
        title: "Build an abnormal-procedure card",
        lead: "Short, rehearsed actions outperform a long manual during a time-critical event.",
        paragraphs: [
          "Create aircraft-specific memory actions followed by a checklist. For lost link: confirm aircraft state, attempt the briefed link recovery, track programmed behavior, clear the expected route, and prepare alternate landing response. For intruding aircraft: descend or maneuver away immediately, maintain sight, and land if uncertainty remains.",
          "For battery or propulsion anomalies: reduce demand, avoid flight over people, choose the nearest suitable landing, and prepare the area. For GPS or compass anomalies: stop autonomous routing, use the most reliable remaining control mode you are trained to use, and land before uncertainty expands.",
          "Practice scenarios with the crew. A rehearsal should expose ambiguous callouts, unsafe return settings, and roles that overload the remote PIC.",
        ],
      },
    ],
    scenarios: [
      {
        question: "At night, full anti-collision intensity reflects from light fog and prevents the crew from seeing attitude clearly. May the PIC reduce it?",
        answer: "Yes. The PIC may reduce anti-collision-light intensity when operating conditions make that necessary for safety.",
        reasoning: [
          "The light must be capable of visibility for at least 3 statute miles.",
          "The rule expressly permits intensity reduction when safety requires.",
          "Reassess whether fog, visibility, and orientation still allow the operation to continue safely and legally.",
        ],
        trap: "Treating maximum brightness as mandatory regardless of its effect on safety.",
      },
      {
        question: "A 0.50-lb drone has unguarded propellers capable of lacerating skin. Does its weight alone qualify it for Category 1 operations over people?",
        answer: "No. Category 1 also requires that the aircraft contain no exposed rotating parts that would lacerate human skin.",
        reasoning: [
          "Confirm total operating weight is 0.55 lb or less.",
          "Separately evaluate exposed rotating parts.",
          "Then apply Remote ID and open-air-assembly requirements where relevant.",
        ],
        trap: "Memorizing only the Category 1 weight threshold.",
      },
      {
        question: "Your module-equipped legacy drone is broadcasting Remote ID. May you intentionally fly it beyond visual line of sight?",
        answer: "No. The broadcast-module compliance method requires the person manipulating the controls to maintain VLOS.",
        reasoning: [
          "Remote ID and VLOS are separate requirements.",
          "The broadcast-module method adds an explicit VLOS operating condition.",
          "Broadcasting identity does not provide BVLOS authority.",
        ],
        trap: "Assuming Remote ID is permission for expanded operations.",
      },
    ],
    traps: [
      "Emergency authority permits only the deviation needed to address the emergency.",
      "Night qualification, lighting, airspace authorization, and VLOS are separate checks.",
      "Category 1 requires both low weight and safe rotating parts.",
      "Category 2 or 3 status comes from compliant aircraft, not a pilot’s field assessment.",
      "Remote ID does not replace registration, certification, airspace authorization, or VLOS.",
    ],
    recall: [
      "State the first four actions for a lost-link event at your usual flying site.",
      "Explain rods, cones, dark adaptation, and autokinesis.",
      "Compare Categories 1, 2, 3, and 4 in one sentence each.",
      "Name the three Remote ID compliance paths and the key constraint of each.",
    ],
    takeaways: [
      "Configure and rehearse contingencies before exposure begins.",
      "Night, over-people, and Remote ID rules contain multiple simultaneous conditions.",
      "Protect people and other aircraft first; recover equipment only when that remains safe.",
    ],
    sources: [
      { label: "FAA Operations Over People", href: "https://www.faa.gov/uas/commercial_operators/operations_over_people" },
      { label: "FAA Remote ID", href: "https://www.faa.gov/uas/getting_started/remote_id" },
      { label: "14 CFR Part 107", href: "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107" },
    ],
  },
];
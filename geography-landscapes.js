'use strict';
// Suggestions de cadre de vie : elles n’ajoutent aucune localité nommée au lore.
const REGION_LANDSCAPES={
'Birmilistan':['Une caravane marchande traversant le désert','Un hameau en bordure de jungle','Un grand port marchand à l’architecture orientale','Un quartier animé d’une cité aux maisons blanchies','Un village agricole dans une plaine fertile','Un campement près des dunes'],
'Confins du Givre':['Un village de chasseurs au bord d’un lac gelé','Un campement dans une plaine enneigée','Un hameau de pêcheurs près des glaces','Une communauté installée dans des cavernes rocheuses','Un petit établissement près de sources chaudes'],
'Fjords de Raalnig':['Un village de pêcheurs au fond d’un fjord','Un hameau sur une île battue par les vents','Un petit port abrité entre les rochers','Une communauté de marins sur une côte froide'],
'Srölnagud':['Une communauté minière dans les falaises','Un hameau de chasseurs sur la lande froide','Un village au pied d’un amas rocheux','Un établissement côtier près des aiguilles de pierre'],
'Pays de Frugklost':['Un village fortifié près de la côte','Un quartier portuaire à l’abri d’une crique','Un hameau retranché près d’une forêt','Une communauté agricole protégée par des palissades'],
'Marais d’Efaizh':['Un village fortifié sur la côte','Une communauté installée au bord du marais','Un quartier de temples et d’observatoires','Un hameau de pêcheurs près d’un grand lac','Un habitat reptilien près de ruines anciennes'],
'Archipel Papoutouh':['Un port pirate sur une île boisée','Une communauté de marins dans une crique','Un quartier populaire d’une ville insulaire','Un petit établissement sur une île humide'],
'Fanalzar et le Moogh’ul':['Un village fortifié sur une île boisée','Un quartier de pêcheurs dans une ville côtière','Un hameau insulaire près de ruines anciennes','Une communauté vivant à distance du volcan'],
'Mer Sidralnée':['Un équipage vivant à bord d’un navire','Un camp de travailleurs sur une île minière','Un comptoir de ravitaillement maritime','Une communauté insulaire tournée vers la mer'],
'Jungle d’Uzgueg et forêt maudite':['Une communauté elfique retranchée derrière de hauts murs','Un quartier cultivé à l’intérieur d’une cité isolée','Un petit groupe vivant à la lisière de la jungle','Un campement de passage près d’un lac'],
'Syldérie':['Un clan nomade dans les plaines froides','Une caravane de chariots tirés par des animaux laineux','Un campement de chasseurs près des collines','Une communauté abritée dans des grottes'],
'Plaine gelée du Krönstol':['Une communauté dans des grottes gelées','Un établissement de pêcheurs sous le glacier','Un campement dans la plaine froide','Une communauté vivant autour d’un bastion de glace'],
'Galzanie':['Un quartier industrieux d’une grande cité','Un village agricole dans une plaine cultivée','Un port commerçant sur la côte','Une communauté sylvaine dans une grande forêt','Un petit établissement près des montagnes'],
'Esturlie':['Un village de cavaliers dans une plaine sèche','Un quartier marchand d’un port','Un hameau au bord d’un fleuve','Une communauté rurale près d’une forêt'],
'Dandiskar':['Un village dans une plaine aride','Un quartier portuaire commerçant','Une communauté près de collines rocailleuses','Un hameau au bord d’un lac'],
'Cimes de Kuylinia':['Un village suspendu dans des arbres gigantesques','Une communauté de chasseurs dans la jungle','Un hameau de pêcheurs à l’écart de la forêt','Une communauté amphibienne dans une zone marécageuse','Un petit établissement sur une île côtière'],
'Pays de Nugh':['Un quartier d’artisans dans une grande cité','Un village exploitant les ressources de la lisière','Un quartier marchand proche du port','Une communauté rurale dans une région sèche'],
'Archipel Agatto et îles pleureuses':['Un port sur une île à la végétation luxuriante','Un petit village de marins dans l’archipel','Un campement de naufragés sur une île pluvieuse','Un petit groupe de chercheurs de ressources près de ruines'],
'Côte de Sk’ka':['Un campement de voyageurs près d’une source','Une communauté reptilienne vivant sous les sables','Un bivouac côtier fréquenté par des marins','Un petit groupe installé à l’abri des dunes'],
'Grandes îles d’Embarh':['Un campement de naufragés sur une côte isolée','Une communauté insulaire dans une fortification rudimentaire','Un équipage vivant au large des îles','Un campement temporaire près d’une crique'],
'Fernol':['Un village forestier','Une communauté minière près des montagnes','Un quartier d’artisans dans une ville','Un hameau près d’un lac','Une ferme au milieu des collines'],
'Caladie':['Un quartier d’un port marchand','Un village agricole dans une plaine fertile','Un hameau près d’une forêt','Une communauté minière en montagne','Un petit établissement insulaire'],
'Jungles d’Ammouka':['Un hameau en bordure de jungle','Une communauté côtière','Un campement de chasseurs près d’un cours d’eau','Un village isolé parmi les arbres'],
'Jungles de Sungul':['Un quartier de port fortifié sur la côte','Une communauté dans la jungle','Un campement sur le littoral','Un groupe familial dans des huttes isolées']
};
function landscapesFor(region){
 if(!region)return [];
 if(REGION_LANDSCAPES[region.name])return REGION_LANDSCAPES[region.name];
 const n=foldGeo(region.name);
 if(/foret|bois|galoniel/.test(n))return ['Un hameau forestier','Une communauté à la lisière des bois','Une cabane isolée près d’un chemin','Un campement sous les arbres'];
 if(/marais|marecage/.test(n))return ['Un village au bord du marais','Un hameau sur pilotis','Une cabane près d’un cours d’eau','Un campement sur une bande de terre sèche'];
 if(/montagne|colline/.test(n))return ['Un village de montagne','Une communauté minière','Une ferme isolée dans les collines','Un campement dans une vallée'];
 if(/cote|crique|mer|ile/.test(n))return ['Un village de pêcheurs','Un quartier portuaire animé','Un hameau côtier','Une communauté de marins près d’une crique'];
 if(/moot/.test(n))return ['Un village entouré de cultures','Une ferme au creux des collines','Un hameau près d’un moulin','Un bourg commerçant'];
 if(/kwzprtt/.test(n))return ['Un campement de clan dans les plaines','Un village rural','Un hameau près d’une piste','Une communauté de chasseurs'];
 return ['Un village rural','Un hameau isolé','Une ferme près d’un chemin','Une caravane itinérante','Un quartier d’une ville'];
}
function landscapeChoicesHTML(region){return `<div class="choices geo-landscape-choices">${landscapesFor(region).map((label,i)=>geoChoice('data-geo-landscape',region.id+'|'+i,label,str('geoPlace')===region.id&&str('geoLandscape')===label)).join('')}${geoChoice('data-geo-landscape',region.id+'|custom','Un autre cadre — je le décris',str('geoPlace')===region.id&&str('geoSituation')==='landscape-custom')}</div><p class="help">Ces cadres évoquent les paysages de la région. Ce sont des suggestions narratives, pas des localités nommées dans les sources.</p>`;}
function selectGeoLandscape(value){
 const [id,index]=value.split('|'),region=flowRegions().find(r=>r.id===id);if(!region)return;
 const label=index==='custom'?'':landscapesFor(region)[Number(index)];if(index!=='custom'&&!label)return;
 if(str('geoPlace')!==id)clearGeoDescendants(['geoSituation','geoRelation','geoHabitat','geoDetail','geoLandscape']);
 state.values.geoPlace=id;state.values.geoRegion=id;state.values.geoRelation='inside';state.values.geoLandscape=label;state.values.geoHabitat=label;state.values.geoSituation=index==='custom'?'landscape-custom':'landscape';persist();render();
}

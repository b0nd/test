import user from '../models/user.model';
import logger from '../core/logger/app-logger'
import jwt from 'jsonwebtoken';
import verifyToken from '../config/validation'
import { sendEmail } from '../utils/util'
import {  getSuccessObject, getErrorObject } from '../utils/util'
import { static_content } from '../utils/staticContent'

import { accounting } from '../staticContent/accounting';
import { admin } from '../staticContent/admin';
import { alteration } from '../staticContent/alteration';
import { appliances } from '../staticContent/appliance';
import { assemble } from '../staticContent/assembly';
import { audioVisual } from '../staticContent/audio-visual';
import { beautyServices } from '../staticContent/beautyServices';
import { bricklayingSErvices } from '../staticContent/bricklayingServices';
import { buildingServices } from '../staticContent/buildingServices';
import { CarpentryServices } from '../staticContent/CarpentryServices';
import { ConcreteServices } from '../staticContent/ConcreteServices';
import { CookingServices } from '../staticContent/CookingServices';
import { DeckingServices } from '../staticContent/DeckingServices';
import { DeliveryServices } from '../staticContent/DeliveryServices';
import { DomesticServices } from '../staticContent/DomesticServices';
import { DrivingServices } from '../staticContent/DrivingServices';
import { ElectricalServices } from '../staticContent/ElectricalServices';
import { EntertainmentServices } from '../staticContent/EntertainmentServices';
import { EventServices } from '../staticContent/EventServices';
import { FencingServices } from '../staticContent/FencingServices';
import { FitnessServices } from '../staticContent/FitnessServices';
import { FlooringServices } from '../staticContent/FlooringServices';
import { FoodDeliveryServices } from '../staticContent/FoodDeliveryServices';
import { GardeningServices } from '../staticContent/GardeningServices';
import { HandymenServices } from '../staticContent/HandymenServices';
import { HomeTheaterServices } from '../staticContent/HomeTheaterServices';
import { LandscapingServices } from '../staticContent/LandscapingServices';
import { LegalServices } from '../staticContent/LegalServices';
import { LocksmithServices } from '../staticContent/LocksmithServices';
import { MarketingServices } from '../staticContent/MarketingServices';
import { PaintingServices } from '../staticContent/PaintingServices';
import { PavingServices } from '../staticContent/PavingServices';
import { PestControlServices } from '../staticContent/PestControlServices';
import { PetCareServices } from '../staticContent/PetCareServices';
import { PhotographyServices } from '../staticContent/PhotographyServices';
import { PlasteringServices } from '../staticContent/PlasteringServices';
import {  PlumbingServices } from '../staticContent/PlumbingServices';
import { RealEstateServices } from '../staticContent/RealEstateServices';
import { StaffingServices } from '../staticContent/StaffingServices';
import { SurveyorServices } from '../staticContent/SurveyorServices';


const controller = {};


controller.getStaticContent = async (req, res) => {
    console.log("change "+JSON.stringify(req.body));
    switch(req.query.id){
        case "accountingServices":
        res.send(accounting);
        break;
        case "administrativeServices":
        res.send(admin);
        break;
        case "alterationServices":
        res.send(alteration);
        break;
        case "appliancesServices":
        res.send(appliances);
        break;
        case "assemblyServices":
        res.send(assemble);
        break;
        case "audioVisualServices":
        res.send(audioVisual);
        break;
        case "autoServices":
        res.send(accounting);
        break;
        case "beautyServices":
        res.send(beautyServices);
        break;
        case "bricklayingServices":
        res.send(bricklayingSErvices);
        break;
        // case "bricklayingServices":
        // res.send(accounting);
        // break;
        case "building&ConstructionServices":
        res.send(buildingServices);
        break;
        case "businessServices":
        res.send(buildingServices);
        break;
        case "carpentryServices":
        res.send(CarpentryServices);
        break;
        case "cleaningServices":
        res.send(accounting);
        break;
        case "computers&ITServices":
        res.send(accounting);
        break;
        case "concretingServices":
        res.send(ConcreteServices);
        break;
        case "cookingServices":
        res.send(CookingServices);
        break;
        case "deckingServices":
        res.send(DeckingServices);
        break;
        case "deliveryServices":
        res.send(DeliveryServices);
        break;
        case "domesticServices":
        res.send(DomesticServices);
        break;
        case "drivingServices":
        res.send(DrivingServices);
        break;
        case "electricalServices":
        res.send(ElectricalServices);
        break;
        case "entertainmentPartyServices":
        res.send(EntertainmentServices);
        break;
        case "eventsCateringServices":
        res.send(EventServices);
        break;
        case "fencingServices":
        res.send(FencingServices);
        break;
        case "fitnessServices":
        res.send(FitnessServices);
        break;
        case "flooringServices":
        res.send(FlooringServices);
        break;
        case "foodDeliveryServices":
        res.send(FoodDeliveryServices);
        break;
        case "gardeningServices":
        res.send(GardeningServices);
        break;
        case "handymanServices":
        res.send(HandymenServices);
        break;
        case "electricalServices":
        res.send(accounting);
        break;
        case "entertainmentPartyServices":
        res.send(accounting);
        break;
        case "eventsCateringServices":
        res.send(accounting);
        break;
        case "fencingServices":
        res.send(accounting);
        break;
        case "fitnessServices":
        res.send(accounting);
        break;
        case "flooringServices":
        res.send(accounting);
        break;
        case "foodDeliveryServices":
        res.send(accounting);
        break;
        case "gardeningServices":
        res.send(GardeningServices);
        break;
        case "handymanServices":
        res.send(HandymenServices);
        break;
        case "homeTheatreServices":
        res.send(HomeTheaterServices);
        break;
        case "immigrationServices":
        res.send(accounting);
        break;
        case "landscapingServices":
        res.send(LandscapingServices);
        break;
        case "legalServices":
        res.send(LegalServices);
        break;
        case "locksmithServices":
        res.send(LocksmithServices);
        break;
        case "marketingServices":
        res.send(MarketingServices);
        break;
        case "paintingServices":
        res.send(PaintingServices);
        break;
        case "pavingServices":
        res.send(PavingServices);
        break;
        case "pestControlServices":
        res.send(PestControlServices );
        break;
        case "petCareServices":
        res.send(PetCareServices);
        break;
        case "photographyServices":
        res.send(PhotographyServices);
        break;
        case "plasteringServices":
        res.send(PlasteringServices);
        break;
        case "plumbingServices":
        res.send(PlumbingServices);
        break;
        case "realEstateServices":
        res.send(RealEstateServices);
        break;
        case "removalsServices":
        res.send(accounting);
        break;
        case "roofingServices":
        res.send(accounting);
        break;
        case "staffingServices":
        res.send(StaffingServices);
        break;
        case "surveyorServices":
        res.send(SurveyorServices);
        break;
        case "tilingServices":
        res.send(accounting);
        break;
        case "translationServices":
        res.send(accounting);
        break;
        case "treeRemovalServices":
        res.send(accounting);
        break;
        case "tutoringServices":
        res.send(accounting);
        break;
        case "samedayServices":
        res.send(accounting);
        break;
        case "videographyServices":
        res.send(accounting);
        break;
        case "weldingServices":
        res.send(accounting);
        break;
        case "writingServices":
        res.send(accounting);
        break;
    }
   // res.send(static_content[req.body.id]);

  }

  controller.getCategories = async (req, res) => {
      try {
          let result = await user.getCategories();
          console.log('data '+result);
          res.send(getSuccessObject(result));
      }
      catch(err) {
          logger.error('Error in login- ' + err);
          res.send('Got error in login');
      }
    console.log("in static"+req.query.id);
   // res.send(static_content[req.query.id]);

  }

  controller.getAlerts = async (req, res) => {
      try {
          let result = await user.getAlerts();
          console.log('data '+result);
          res.send(getSuccessObject(result));
         // res.send(result);
      }
      catch(err) {
          logger.error('Error in login- ' + err);
          res.send('Got error in login');
      }
    console.log("in static"+req.query.id);
    //res.send(static_content[req.query.id]);

  }

export default controller;
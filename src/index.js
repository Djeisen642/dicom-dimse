import Connection from "./Connection.js";
import C from "./constants.js";
import { Enum } from "enumify";

class Level extends Enum {}
Level.initEnum(["PATIENT", "STUDY", "SERIES", "INSTANCE"]);

const DIMSE = {
  connection: new Connection({
    vr: {
      split: false
    }
  })
};

const conn = DIMSE.connection;

DIMSE.associate = function(contexts, options) {
  const defaults = {
    contexts
  };

  options = Object.assign(defaults, options);

  console.info("Associating...");

  return new Promise((resolve, reject) => {
    let socket;
    try {
      socket = conn.associate(options, function(pdu) {
        // Associated
        console.info("==Associated");
        resolve(socket);
      });
    } catch (error) {
      reject(error);
    }

    socket.on("error", function(error) {
      console.info("==error", error);
      reject(error);
    });

    socket.on("timeout", function(error) {
      console.info("==timeout", error);
      reject(error);
    });
  });
};

DIMSE.find = function(socket, level, params) {
  return new Promise((resolve, reject) => {
    const studies = [];
    let result;
    try {
      switch (level) {
        case Level.PATIENT:
          result = socket.findPatients(params);
          break;
        case Level.STUDY:
          result = socket.findStudies(params);
          break;
        case Level.SERIES:
          result = socket.findSeries(params);
          break;
        case Level.INSTANCE:
          result = socket.findInstances(params);
          break;
        default:
          throw "invalid level selected";
      }
    } catch (error) {
      console.error(error);
      reject(error);
    }

    result.on("result", function(msg) {
      studies.push(msg);
    });

    result.on("end", function() {
      socket.release();
      resolve(studies);
    });

    result.on("close", function() {
      resolve(studies);
    });
  });
};

DIMSE.retrievePatients = async function(params, options) {
  let socket;
  try {
    socket = await DIMSE.associate([C.SOP_PATIENT_ROOT_FIND], options);
  } catch (error) {
    console.error(error);
  }

  if (!socket) {
    console.error("Assoc failed");
    console.trace();
    return [];
  }

  const defaultParams = {
    0x00100010: "",
    0x00100020: "",
    0x00100030: "",
    0x00100040: "",
    0x00101010: "",
    0x00101040: ""
  };

  try {
    return await this.find(
      socket,
      Level.PATIENT,
      Object.assign(defaultParams, params)
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};

DIMSE.retrieveStudies = async function(params, options) {
  let socket;
  try {
    socket = await DIMSE.associate([C.SOP_STUDY_ROOT_FIND], options);
  } catch (error) {
    console.error(error);
  }

  if (!socket) {
    console.error("Assoc failed");
    console.trace();
    return [];
  }

  const defaultParams = {
    0x0020000d: "",
    0x00080060: "",
    0x00080005: "",
    0x00080020: "",
    0x00080030: "",
    0x00080090: "",
    0x00100010: "",
    0x00100020: "",
    0x00200010: "",
    0x00100030: ""
  };

  try {
    return await this.find(
      socket,
      Level.STUDY,
      Object.assign(defaultParams, params)
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};

DIMSE.retrieveSeries = async function(studyInstanceUID, params, options) {
  if (!studyInstanceUID) {
    console.error("Missing study instance uid");
    return [];
  }

  let socket;
  try {
    socket = await DIMSE.associate([C.SOP_STUDY_ROOT_FIND], options);
  } catch (error) {
    console.error(error);
  }

  if (!socket) {
    console.error("Assoc failed");
    console.trace();
    return [];
  }

  const defaultParams = {
    0x0020000d: studyInstanceUID ? studyInstanceUID : "",
    0x00080005: "",
    0x00080020: "",
    0x00080030: "",
    0x00080090: "",
    0x00100010: "",
    0x00100020: "",
    0x00200010: "",
    0x0008103e: "",
    0x0020000e: "",
    0x00200011: ""
  };

  try {
    return await this.find(
      socket,
      Level.SERIES,
      Object.assign(defaultParams, params)
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};

DIMSE.retrieveInstances = async function(
  studyInstanceUID,
  seriesInstanceUID,
  params,
  options
) {
  if (!studyInstanceUID) {
    console.error("Missing study instance uid");
    return [];
  }

  if (!seriesInstanceUID) {
    console.error("Missing series instance uid");
    return [];
  }

  let socket;
  try {
    socket = await DIMSE.associate([C.SOP_STUDY_ROOT_FIND], options);
  } catch (error) {
    console.error(error);
  }

  if (!socket) {
    console.error("Assoc failed");
    console.trace();
    return [];
  }

  const getInstanceRetrievalParams = (studyInstanceUID, seriesInstanceUID) => ({
    0x0020000d: studyInstanceUID ? studyInstanceUID : "",
    0x0020000e: studyInstanceUID && seriesInstanceUID ? seriesInstanceUID : "",
    0x00080005: "", // SpecificCharacterSet
    0x00080020: "", // StudyDate
    0x00080030: "", // StudyDescription
    0x00080090: "", // ReferringPhysicianName
    0x00100010: "", // PatientName
    0x00100020: "", // PatientId
    0x00100030: "", // PatientBirthDate
    0x00100040: "", // PatientSex
    0x00200010: "", // StudyId
    0x0008103e: "", // SeriesDescription
    0x00200011: "", // SeriesNumber
    0x00080080: "", // InstitutionName
    0x00080016: "", // SopClassUid
    0x00080018: "", // SopInstanceUid
    0x00080060: "", // Modality
    0x00200013: "", // InstanceNumber
    0x00280010: "", // Rows
    0x00280011: "", // Columns
    0x00280100: "", // BitsAllocated
    0x00280101: "", // BitsStored
    0x00280102: "", // HighBit
    0x00280103: "", // PixelRepresentation
    0x00280004: "", // PhotometricInterpretation
    0x0008002a: "", // AcquisitionDatetime
    0x00280008: "", // NumFrames
    // 0x00280009: '', // frameIncrementPointer // This appears to be breaking Orthanc DIMSE connections
    0x00181063: "", // FrameTime
    0x00181065: "", // FrameTimeVector
    0x00281052: "", // RescaleIntercept
    0x00281053: "", // RescaleSlope
    0x00280002: "", // SamplesPerPixel
    0x00180050: "", // SliceThickness
    0x00201041: "", // SliceLocation
    // 0x00189327: '', // tablePosition // This appears to be breaking Orthanc DIMSE connections
    0x00281050: "", // WindowCenter
    0x00281051: "", // WindowWidth
    0x00280030: "", // PixelSpacing
    0x00200062: "", // Laterality
    0x00185101: "", // ViewPosition
    0x00080008: "", // ImageType
    0x00200032: "", // ImagePositionPatient
    0x00200037: "", // ImageOrientationPatient
    0x00200052: "", // FrameOfReferenceUID
    0x00282110: "", // LossyImageCompression
    0x00282112: "", // LossyImageCompressionRatio
    0x00282114: "", // LossyImageCompressionMethod,
    0x00180088: "" // SpacingBetweenSlices

    // Orthanc has a bug here so we can't retrieve sequences at the moment
    // https://groups.google.com/forum/#!topic/orthanc-users/ghKJfvtnK8Y
    // 0x00282111: '', // derivationDescription
    // 0x00082112: ''  // sourceImageSequence
  });

  const defaultParams = getInstanceRetrievalParams(
    studyInstanceUID,
    seriesInstanceUID
  );
  try {
    return await this.find(
      socket,
      Level.INSTANCE,
      Object.assign(defaultParams, params)
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};

DIMSE.storeInstances = function(fileList, callback) {
  const handle = conn.storeInstances(fileList);

  handle.on("file", function(err, file) {
    callback(err, file);
  });
};

DIMSE.moveInstances = async function(
  studyInstanceUID,
  seriesInstanceUID,
  sopInstanceUID,
  sopClassUID,
  destination,
  params
) {
  if (!studyInstanceUID) {
    console.error("Missing study instance uid");
    return [];
  }

  let socket;
  try {
    socket = await DIMSE.associate(
      [C.SOP_STUDY_ROOT_MOVE, sopClassUID],
      options
    );
  } catch (error) {
    console.error(error);
  }

  if (!socket) {
    console.error("Assoc failed");
    console.trace();
    return [];
  }

  const defaultParams = {
    0x0020000d: studyInstanceUID,
    0x0020000e: seriesInstanceUID ? seriesInstanceUID : "",
    0x00080018: sopInstanceUID ? sopInstanceUID : ""
  };

  socket.moveInstances(destination, Object.assign(defaultParams, params));
};
export default DIMSE;

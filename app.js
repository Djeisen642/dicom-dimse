const DIMSE = require("./dist/dimse").default;

const run = async function() {
  if (DIMSE) {
    DIMSE.connection.addPeer({
      aeTitle: "CONQUESTSRV1",
      host: "127.0.0.1",
      port: 5678,
      default: true
    });
    DIMSE.connection.addPeer({
      aeTitle: "DIMSE",
      host: "127.0.0.1",
      port: 9999,
      default: true,
      server: true
    });

    /*
    const patients = await DIMSE.retrievePatients();

    patients.forEach(element => {
      // console.log(element);
    });

    const studies = await DIMSE.retrieveStudies();

    studies.forEach(element => {
      // console.log(element);
    });

    const series = await DIMSE.retrieveSeries();
    series.forEach(element => {
      // console.log(element);
    });

    const instances = await DIMSE.retrieveInstances();
    instances.forEach(element => {
      // console.log(element);
    });
    */
    try {
      // await DIMSE.moveInstances('DIMSE', '1.3.46.670589.11.0.1.1996082307380006', '1.3.46.670589.11.0.2.1996082307380006', '1.3.46.670589.11.0.4.1996082307380006', '1.2.840.10008.5.1.4.1.1.4');
      await DIMSE.moveInstances('DIMSE', '1.3.46.670589.5.2.10.2156913941.892665384.993397', null, null, '1.2.840.10008.5.1.4.1.1.4');
      // await DIMSE.getInstances('1.3.46.670589.5.2.10.2156913941.892665384.993397', null, null, '1.2.840.10008.5.1.4.1.1.4');
    } catch (error) {
      console.log(error);      
    }
    console.log('done');
    process.exit();  }
};
run();

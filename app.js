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

    process.exit();  }
};
run();

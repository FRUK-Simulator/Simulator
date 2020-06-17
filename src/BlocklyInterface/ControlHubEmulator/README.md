# ContorlHubEmulator

The ControlHubEmulator emulates a control unit for motors and sensors.
It provides multiple outputs and inputs whereas the outputs control
DCMotorsWithEncoder(s) and ServoMotor(s) and the inputs sensors.

It's also possible to add multiple ControlHubListener(s) to the ControlHubEmulator
which will be notified on any command the ControlHubEmulator receives.

The ControlHubEmulator has to be given a SensorProvider from which
it can query sensor data (2D/3D world simulator).

YourListener <- ControlHub -> SensorProvider -> WorldSimulator

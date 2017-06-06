=====================
Device API Normaliser
=====================

Intro
=====

This library creates two helper functions designed to parse device orientation
and devicemotion events. It returns objects that you can query as per the
spec at the W3C with as much consistency as possible provided. Currently
as per this document: http://dev.w3.org/geo/api/spec-source-orientation

Most devices now support at least part of the spec with motion being the most
weakly supported in terms of the values being exposed but orientation being
most wacky due to varying implementations.

The aim of this library is to attempt to normalise the way the different vendors
are implementing the API and make it consistent across browsers.

This library is licenced under a BSD style licence as per the licence document included in the repo.

All issues etc should be logged at the github repo at http://github.com/ajfisher/deviceapi-normaliser/

Usage
=====

Assumes - Jquery is installed so access to $.browser object is available. 

Install the file in your path, include it in a script tag (after jquery).

Call the init function for the motion / orientation object:

    mo.init();

This will do the various device detection etc as needed so it can work out what
corrections are required.

Then add your eventlisteners to your page:

    window.addEventListener("deviceorientation", [my_orientation_change_handler], false);

    window.addEventListener("devicemotion", [my_motion_change_handler], false);

You will need to define your own handlers for the methods given above.

In these methods simply call the relevant function below and you'll be returned 
an object as per the spec.

You will need to call it with the event object passed into the handler.

Eg:

    function my_orientation_change_handler(e) {
        var obj = deviceOrientation(e);

        // returns
        obj.gamma
        obj.alpha
        obj.beta
    }

    function my_motion_change_handler(e) {
        var obj = deviceMotion(e);
        
        // returns
        obj.accelerationIncludingGravity.x
        obj.accelerationIncludingGravity.y
        obj.accelerationIncludingGravity.z        

    }

Known Issues
=============

* iOS devices prior to the iPhone 4 do not have a gyro and as a result don't provide that data back.
* Mobile chrome has only partial support on Android (orientation only). There 
  is an outstanding ticket to get motion included though (https://code.google.com/p/chromium/issues/detail?id=135804)
* rotationRate is partly supported but seemingly not entirely consistent for those devices that support it.
* doing Feature detection of the motion and orientation events isn't reliable due to misreporting

Currently known to work on
==========================

Android
-------

* Firefox - Gingerbread (2.3)+ devices (Motion and Orientation) NB: Firefox is 
  not available on 2.3 anymore for new installs
* Chrome for Android - ICS (4.0)+ Orientation only (no motion)
* Android Browser - ICS (4.0)+ (Orientation and some motion)
* Chrome for Android - JB Orientation only (no motion)
* Firefox - JB Orientation and Motion.
* Note that the "stock" Android browser no longer exists as of JellyBean in
  favour of Chrome.

iPhone / iPad
-------------

* Chrome for iOS - iOS6+ Motion and Orientation
* Mobile Safari  - iOS4+ Motion and Orientation

BlackBerry 10
-------------

* Tested on the Blackberry Playbook stock browser - Motion and Orientation

Current Tests of Spec compliance
=================================

Device Orientation
------------------

The specs suggest the following:

* X is in the plane of the ground and is positive to the East (-ive to West)
* Y is in the plane of the ground and is positive to the North (-ive to South)
* Z is perpendicular to the ground plane and is positive towards the sky (negative into the earth)

Rotation should be expressed using the right hand rule, thus positive values 
with rotation clockwise around the axis of rotation when looking down the axis.

The tables below express where the zero point is for a given axis, what the 
values are for it's rotational range, whether it obeys the Right Hand Rule* 
and any further notes.

RHR* = Right Hand Rule. That positive values increase when rotating clockwise 
  around the axis of rotation when looking along the axis' postive trajectory. 
  This causes confusion because for a compass it looks like you're going 
  backwards but that's because you're looking along the -ive trajectory of the 
  Z axis.

With respect to RHR, Y=Yes, N=No and P=Partial which means it follows some of the RHR guidance

Alpha (compass/ yaw)
....................

The spec is unclear what the defaults should be and so as a result many different 
choices are taken by the vendors. This causes confusion and the spec is not clear 
about what 0 degrees should actually be. From the example it is implied that North 
is 0 degrees because West is given as +90 degrees (which is correct under the RHR). 

The range is tested by holding the device level in the horizontal plane, 
orienting it to the zero point then turning it through 360 degrees, observing 
its range and direction.

===========     ==========      ====    ========
\               Zero point      RHR*    Range
===========     ==========      ====    ========
Reference:      North (0)       Y       [0, 360]
iOS Chome:      East (90)       Y       [0, 360]
iOS Safari:     East (90)       Y       [0, 360]
Blackberry:     South(180)      N       [0, 360]
Android ICS
Chrome:         North (0)       Y       [0, 360]
Stock:          West (270)      Y       [0, 360]
Firefox:        North (0)       N       [0, 360]
Android JB
Chrome:         North(0)        Y       [0, 360]
Firefox         North (0)       N       [0, 360]       
===========     ==========      ====    ========

Beta (Pitch)
............

The spec defines zero point as being flat in the horizontal plane. All browsers 
now support this model. Note that there are some issues in the ranging of the 
values.

The range is tested by holding the device level in the horizontal plan and 
confirming the zero point. The device is then rotated around the X axis through 
90 degrees (screen faces observer), then through the next 90 degrees (screen 
face down), then the remaining 180 degrees completing the bottom portion of 
the rotation.

===========     ===========     ====    =============   ========================================
\               Zero point      RHR*    Range           Notes
===========     ===========     ====    =============   ========================================
Reference       Horiz Plane     Y       [0, -180|180]
iOS Chome:      Horiz Plane     Y       [-90, 90]       Full range of rotation not supported.[1]
iOS Safari:     Horiz Plane     Y       [-90, 90]       Full range of rotation not supported.[1]
Backberry:      Horiz Plane     Y       [0, -180|180]   Per spec
Android ICS
Chrome:         H. Plane        Y       [-90, 90]       Full range of rotation not supported.[1]
Stock           H. Plane        Y       [-90, 90]       Full range of rotation not supported.[1]
Firefox         H. Plane        N       [0, 180|-180]   Back to front[2]
Android JB
Chrome:         H. Plane        Y       [-90, 90]       Full range of rotation not supported.[1]
Firefox         H. Plane        N       [0, 180|-180]   Back to front[2]
===========     ===========     ====    =============   ========================================

[1] Under iOS as well as the stock Android browser and Chrome for Android, 
the rotation goes the right direction from the horizontal plane however once it 
hits the maximal or minimal point at (90 | -90 degrees) it simply starts to 
decrease again, rather than provide the full rotation.

[2] In FF on android the rotation is back to front but it does go through the 
full range to 180 degrees. However under firefox the value is -90 when the top 
is point upwards and 90 when the top of the device points downwards. This is a 
reversing of the RHR.

Gamma (Roll)
.............

The spec defines the zero point as being level in the horizontal place. Again 
there are some issues with ranges and some implied issues with how the W3C have 
defined this as they are assuming only 90 degrees of rotation around the Y axis 
is relevant.

The range is tested by holding the device level in the horizontal plane and 
confirming a zero point. The device it then rotated around the Y axis 90 degrees 
clockwise (screen faces right) then again (screen faces down) and then through 
the other 180 degrees back to the origin.

===========     ===========      ====    =============   ========================================
\               Zero point       RHR*    Range           Notes
===========     ===========      ====    =============   ========================================
Reference       Horiz Plane      Y       [0, 90|-90]     [1]
iOS Chome:      Horiz Plane      Y       [0, 180|-180]   Full range of rotation not supported[2]
iOS Safari:     Horiz Plane      Y       [0, 180|-180]   Full range of rotation not supported[2]
Blackberry:     Horiz Plane      Y       [0, 90|-90]     Per Spec
Android ICS
Chrome:         H. Plane         Y       [0, 270|-90]    Odd range to cope with the gaps[3]
Stock:          H. Plane         Y       [0, 270|-90]    Odd range to cope with the gaps[3]
Firefox         H. Plane         N       [0, -90|90]     Range back to front [4]
Android JB
Chrome:         H. Plane         Y       [0, 270|-90]    Odd range to cope with the gaps[3]
Firefox         H. Plane         N       [0, -90|90]     Range back to front [4]
===========     ===========      ====    =============   ========================================

[1] This is poor definition by the W3C as it implies rotation only happens to 
90 degrees from the horizontal plane, thus causing an issue when you go under 
this.

[2] Under iOS rotation starts from the horizontal plan with the screen facing 
up as the zero point. Rotating around the Y axis so that the screen is facing 
down will result in a value of 180 or -180. If the rotation occurs clockwise the 
values increase through the +ive range, if the rotation is anti-clockwise then 
the values increase through the -ive range. Thus resting the R edge (L edge 
upwards) the value is 90, the reverse (resting on the L edge, R edge up) means 
the value is -90.

[3] The Chrome for Android and stock android browsers create the right rotational 
vales for the +-90 range however the gap after 90 on the clockwise rotation is 
filled with increasing +ive values until it reaches the -90 value. This provides 
an opportunity to know exactly how far the device is rotated around the Y axis 
but can't be replicated by any of the others.

[4] Firefox reverses its range the same way as it does on Beta. The range is 
correct however rotation clockwise results in a -ive number and the reverse.

Device Motion
-------------

Support for motion properties:

+----------------+-------+-------+-----+-----------+
|                |  Acc  | AccIG | Rot | Interval  |
+================+=======+=======+=====+===========+
| iOS Chome:     | N     | Y     | N   | N         |
+----------------+-------+-------+-----+-----------+
| iOS Safari:    | Y     | Y     | Y   | Y         |
+----------------+-------+-------+-----+-----------+
| Android Chrome:| N     | N     | N   | N         |
+----------------+-------+-------+-----+-----------+
| Android Stock: | N     | Y     | N   | Y         |
+----------------+-------+-------+-----+-----------+
| Android FF:    | Y     | Y     | Y   | Y         |
+----------------+-------+-------+-----+-----------+
| Blackberry     | Y     | N     | N   | Y[1]      |
+----------------+-------+-------+-----+-----------+

[1] Weirdly BB uses a variable interval instead of a constant which is the 
guidance from the spec. This implies the sampling is done in software rather 
than hardware off the accelerometer chip?

Event handling detection
========================

Given the large range of results and the incomplete handling of motion versus
orientation across devices. Understanding the differences between the devices
is critical in order to have similar performance in a multi-device context 
(eg for games). The following is some information about feature detection and
how different browsers handle it.

Device Orientation
------------------

Simply checking for if(window.DeviceOrientationEvent) yields the following:

================    =======     ==========
Browser             Result      Notes
================    =======     ==========
Chrome (Desktop)    True        Failure[1]
Chrome (JB/ICS)     True        [2]
Chrome (iOS)        True        
Firefox (JB/ICS)    True
Safari (iOS)        True
Blackberry          True        [2]
Android (stock)     True        [1]
================    =======     ==========

[1] Chrome on desktop provides a false positive with this event suggesting it's
available in all versions of desktop chrome but reports nothing unless a tilt
sensor is available to the computer

[2] Chrome on Android, the ICS stock Android browser and the BB stock browser
all detect correctly but only if a warm up time for the gyro is provided. If 
this is detected with immediate execution it will fail with false results.

Device Motion
-------------

Simply checking for if(window.DeviceMotionEvent) yields the following:

================    =======     ==========
Browser             Result      Notes
================    =======     ==========
Chrome (Desktop)    False       
Chrome (JB/ICS)     False       
Chrome (iOS)        True        
Firefox (JB/ICS)    True
Safari (iOS)        True
Blackberry          True
Android Stock       True
================    =======     ==========

The results from motion are much more consistent with reality, with no false
positives and actual detection occurring correctly in all instances.

Feature detection and correction
================================

Using the various ways browsers report their capability given above as well as a
very small dose of browser type detection or UA checks (it's understood this is
not ideal but it's skewed towards extremely loose detection checks and there's
no other alternative) it is possible to determine what device is being used and
as a result what modifications are required to bring the values from the events
back on spec.

It should be noted that this really only applies to the orientation events as
the motion spec is either correct or not implemented at all.

The table below summarises the event feature detection, decisions about what
browser it's likely to be or whether further detection is actually required.

+--------------+-----------+-----------+-------------------+------------------------------------+
| Orientation  | Motion    | OS        | Browser           | Further detection                  |
+==============+===========+===========+===================+====================================+
| True         | True      | iOS       | Safari / Chrome   | $.browser.webkit && !Android       |
|              |           +-----------+-------------------+------------------------------------+
|              |           | Android   | Firefox           | ! $.browser.webkit                 |
|              |           |           +-------------------+------------------------------------+
|              |           |           | Stock             | userAgent.match(/Android/i)        |
|              |           +-----------+-------------------+------------------------------------+
|              |           | Blackberry| Stock             | userAgent.match(/RIM|Blackberry/i) |
+--------------+-----------+-----------+-------------------+------------------------------------+
| True         | False     | Desktop   | Webkit            | N/A                                |
|              |           +-----------+-------------------+------------------------------------+
|              |           | Android   | Chrome            | userAgent.match(/Android/i)        |
+--------------+-----------+-----------+-------------------+------------------------------------+

Correction:
-----------

As can be seen in the table below, all of the major browsers in play require
a degree of change in order to bring them back to the standard for orientation.

=============     =================================
Browser / OS      Correction
=============     =================================
iOS Webkit        Alpha: (-90 degrees)
                  Beta: (correct range)
                  Gamma: (Limit range)  
Android:
Firefox           Alpha, Beta, Gamma (Reverse RHR)
Stock             Alpha None
                  Beta (Correct range)
                  Gamma (Limit Range)
Chrome            Alpha: None
                  Beta: (Correct range)
                  Gamma: (Limit Range)
Blackberry        Alpha: (-180 degrees)
                  Beta: None
                  Gamma: None
=============     =================================


Behavioural changes from default
=================================

NB: This section needs considerable refactoring based on the updated spec and 
the way the vendors have implemented it. For the moment there are no behavioural 
changes from the default.

The following mods have been made to bring the devices into "line" with the spec.

Safari:

* Early iOS devices have no gyro - as such any call to deviceOrientation will 
  return the right object but with data as null.

Firefox:


Roadmap
=======

* Write handler to detect whether eventlisteners should be bound or not based 
  on capabilities.



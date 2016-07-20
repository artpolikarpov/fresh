<!DOCTYPE html>
<html>

<head>

<?php _LIB ('jquery') ?>
<?php _LIB ('pseudohover') ?>
<?php _LIB ('smart-title') ?>

<?php _CSS ('main') ?>
<?php _JS ('main') ?>

<?php if ($content['sign-in']['done?']) { ?>
<?php _CSS ('admin') ?>
<?php _JS ('admin') ?>
<?php  } ?>

<e2:head-data />
<e2:scripts-data />

</head>

<body>
<?php _X ('body-pre') ?>

<?php _T_FOR ('form-install') ?>
<?php _T_FOR ('form-login') ?>

<?php if ($content['engine']['installed?']): ?>
<?php _T ('author-menu') ?>
<?php _T ('layout'); ?>
<?php if (!$content['sign-in']['done?'] and !$content['sign-in']['necessary?']) { ?>
  <a class="e2-visual-login nu" id="e2-visual-login" href="<?= $content['hrefs']['sign-in'] ?>" class="nu"><span class="i-login"></span></a>
<?php  } ?>
<?php endif ?>

</body>


</html>

<!-- <?=$content['engine']['version-description']?> -->


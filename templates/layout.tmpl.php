<div id="layout-root" class="layout layout--<?= $content['class'] ?>">

<div class="layout__floor header">
<?php _X ('header-pre') ?>

<div class="js-cover blog-title">
  <div class="title">
    <h1><span class="text-bg"><span class="text-bg__1"><span class="text-bg__2">
      <?= _A ('<a href="'. $content['blog']['href']. '"><span id="e2-blog-title">'. $content['blog']['title']. '</span></a>') ?>
      <?php
        if (
          array_key_exists ('admin-hrefs', $content)
          and array_key_exists ('name-and-author', $content['admin-hrefs'])
          and !_AT ($content['admin-hrefs']['name-and-author'] )
        ) {
      ?>
        <a href="<?= $content['admin-hrefs']['name-and-author'] ?>" class="nu"><span class="i-edit"></span></a>
      <?php } ?>
    </span></span></span></h1>
  </div>

  <?php if ($content['frontpage?']) { ?>
    <div class="description">
      <span id="e2-blog-description"><?= $content['blog']['description'] ?></span>
    </div>

    <?php if ($content['notes'] or $content['tags']) { ?>

      <ul class="menu">
        <?php if (array_key_exists ('favourites', $content)) { ?>
          <li>
            <?php if (_AT ($content['favourites']['href'])): ?>
            <?=$content['favourites']['title']?>
            <?php else: ?>
            <a href="<?= $content['favourites']['href'] ?>"><?=$content['favourites']['title']?></a>
            <?php endif ?>
          </li>
        <?php } ?>

        <?php if (array_key_exists ('most-commented', $content)) { ?>
          <li>
            <?php if (_AT ($content['most-commented']['href'])): ?>
            <?=$content['most-commented']['title']?>
            <?php else: ?>
            <a href="<?= $content['most-commented']['href'] ?>"><?=$content['most-commented']['title']?></a>
            <?php endif ?>
          </li>
        <?php } ?>

        <?php if ($content['tags-menu']['not-empty?']) { ?>
          <li>
            <?php if (_AT ($content['hrefs']['tags'])): ?>
            <?= _S ('gs--tags') ?>
            <?php else: ?>
            <a href="<?= $content['hrefs']['tags'] ?>"><?= _S ('gs--tags') ?></a>
            <?php endif ?>
          </li>
        <?php } ?>
      </ul>

    <?php } ?>
  <?php } ?>
</div>

<?php _X ('header-post') ?>
</div>

<div class="layout__floor content">
  <?php _T ('heading') ?>
  <?php _T ('message') ?>
  <?php _T ('welcome') ?>
  <?php _T ('drafts') ?>
  <?php _T ('notes') ?>
  <?php _T ('notes-list') ?>
  <?php _T ('tags') ?>
  <?php _T ('sessions') ?>
  <?php _T ('pages') ?>
</div>

<div class="layout__layout sub-content" <?= $content['class'] == 'note' && ((array_key_exists ('comments', $content)) || $content['notes']['only']['commentable-now?']) ? 'id="comments"' : '' ?>><div class="layout__floor sub-content__wrap">
  <?php _T ('comments') ?>
  <?php _T ('popular') ?>
  <?php _T ('unsubscribe') ?>
  <?php _T ('form') ?>
</div></div>

<div class="layout__floor footer">
  <?php _X ('footer-pre') ?>

  <?php if ($content['class'] != 'found') { ?>
    <div class="spotlight">
      <?php _T_FOR ('search') ?>
    </div>
  <?php } ?>

  © <span id="e2-blog-author"><?= @$content['blog']['author'] ?></span>, <?=$content['blog']['years-range']?>
  <?php # please do not remove: #?>

  <div class="engine">
  <?=$content['engine']['about']?>
  <?php if ($content['sign-in']['done?']) { ?>
  &nbsp;&nbsp;&nbsp;
  <span title="<?= _S ('gs--pgt') ?>"><?=$content['engine']['pgt']?> <?= _S ('gs--seconds-contraction') ?></span>
  <?php } ?>
  </div>

  <?php _X ('footer-post') ?>
</div>

</div>

<?php _LIB ('fotorama') ?>
<?php _CSS ('theme-polikarpov') ?>
<?php _LIB ('fotorama') ?>
<?php _JS ('theme-polikarpov') ?>


<script type="text/x-template" id="cover-html">
  <div class="layout layout--cover cover__layout fotorama__select"><div class="layout__floor cover__floor">+++</div></div>
</script>
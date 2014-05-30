<?php if (@$content['pages']['timeline?']) _T ('pages-later') ?>

<?php foreach ($content['notes'] as $note): ?>

<?php _X ('note-pre') ?>

<div class="<?= array_key_exists ('only', $content['notes'])? 'e2-only ': '' ?>e2-note <?= $note['favourite?']? 'e2-note-favourite' : '' ?> <?= $note['visible?']? '' : 'e2-hidden' ?>">

<div class="js-cover note-title-date">
  <?php // DATE AND TIME // ?>

  <?php if (@$note['published?']) { ?>

  <div class="e2-note-date" title="<?=_DT ('j {month-g} Y, H:i, {zone}', @$note['time'])?>"><span class="text-bg"><span class="text-bg__1"><span class="text-bg__2"><?= _AGO ($note['time']) ?></span></span></span></div>

  <?php } else { ?>

  <div class="e2-note-date" title="<?=_DT ('j {month-g} Y, H:i, {zone}', @$note['time'])?> (<?=_DT ('j {month-g} Y, H:i, {zone}', @$note['last-modified'])?>)"><span class="text-bg"><span class="text-bg__1"><span class="text-bg__2"><?=_DT ('j {month-g} Y, H:i', @$note['time'])?></span></span></span></div>

  <?php } ?>

  <?php // TITLE // ?>
  <h1 class="<?= ($note['published?'] and !$note['future?'])? 'e2-published' : 'e2-draft' ?> e2-smart-title e2-note-title">
    <span class="text-bg"><span class="text-bg__1"><span class="text-bg__2">
      <?= _A ('<a href="'. $note['href']. '">'. $note['title']. '</a>') ?>

      <span style="white-space: nowrap">

      <?php if (array_key_exists ('favourite-toggle-href', $note)): ?>
      <a href="<?= $note['favourite-toggle-href'] ?>" class="e2-favourite-toggle nu">
      <span class="i-favourite-<?= ($note['favourite?']? 'set' : 'unset') ?>"></span></a>
      <?php else: ?>
      <?php if (@$note['favourite?']) { ?>★<?php } ?>
      <?php endif ?>

      <?php if (@$note['published?']): ?>

      <?php if (array_key_exists ('edit-href', $note)): ?>
      <a href="<?= $note['edit-href'] ?>" class="nu"><span class="i-edit"></span></a>
      <?php endif ?>

      <?php if (array_key_exists ('delete-href', $note)): ?>
      <a href="<?= $note['delete-href'] ?>" class="nu"><span class="i-remove"></span></a>
      <?php endif ?>

      <?php endif ?>

      </span>
    </span></span></span>
  </h1>

  <div class="e2-note-text e2-text js-cover-lead"></div>
</div>


<?php // TEXT // ?>

<article class="e2-note-text e2-text <?= $note['published?']? 'e2-published' : 'e2-draft' ?>">
<?=@$note['text']?>
</article>


<?php // LIKES // ?>

<?php if (array_key_exists ('only', $content['notes'])) { ?>
<?php if ($note['shareable?']) { ?> 
<?php if ($note['published?'] and !$note['future?']) { ?> 

<?php _LIB ('social-likes') ?>
<div class="e2-note-likes">
<div class="social-likes" data-url="<?= $note['href-original'] ?>" data-title="<?= strip_tags ($note['title']) ?>">

<?php foreach ($note['share-to'] as $network => $network_info) { ?>
<?php if ($network_info['share?']) { ?>
<?php 
  $additional = '';
  if ($network_info['data']) {
    foreach ($network_info['data'] as $k => $v) {
      $additional .= ' data-'. $k .'="'. $v .'"';
    }
  }
?>

<div class="<?= $network ?>" <?= $additional ?>><?= _S ('sn--'. $network .'-verb') ?></div>

<?php } ?>
<?php } ?>

</div>
</div>

<?php } ?>
<?php } ?>
<?php } ?>




<?php // LIST OF KEYWORDS // ?>

<?php if (array_key_exists ('tags', $note)): ?>
<div class="e2-note-tags">
<?php 
$tags = array ();
foreach ($note['tags'] as $tag) {
  if ($tag['current?']) {
    $tags[] = '<span class="e2-tag e2-marked">'. $tag['name'] .'</span>';
  } else {
    $tags[] = '<a href="'. $tag['href'] .'" class="e2-tag">'. $tag['name'] .'</a>';
  }
}
echo implode (' &nbsp; ', $tags)

?>
</div>
<?php endif; ?>


<?php // COMMENTS LINK // ?>

<?php if ($note['comments-link?']): ?>
<div class="e2-note-comments-link">
<?php if ($note['comments-count']) { ?><a href="<?= $note['href'] ?>#comments"><?= $note['comments-count-text'] ?></a><?php if ($note['new-comments-count'] == 1 and $note['comments-count'] == 1) { ?>, <?= _S ('gs--comments-all-one-new') ?><?php } elseif ($note['new-comments-count'] == $note['comments-count']) { ?>, <?= _S ('gs--comments-all-new') ?><?php } elseif ($note['new-comments-count']) { ?> · <span class="admin-links"><a href="<?=$note['href']?>#new"><?= $note['new-comments-count-text'] ?></a></span>
<?php } ?>
<?php } else { ?>
<a href="<?= $note['href'] ?>#comments"><?= _S ('gs--no-comments') ?></a>
<?php } ?>
</div>
<?php endif ?>

</div>

<?php _X ('note-post') ?>

<?php if (!@$note['published?']): ?>
<div class="e2-toolbar">
  <?php if (array_key_exists ('edit-href', $note)) { ?>
    <a href="<?= @$note['edit-href'] ?>" class="nu"><button type="button" class="button">
      <span class="i-edit"></span> <?= _S ('fb--edit') ?>
    </button></a>
  <?php } ?>
</div>
<?php endif ?>

<?php endforeach ?>

<?php if (@$content['no-notes-text']) { ?> 
<p><?=@$content['no-notes-text']?></p>
<?php } ?>

<?php if (@$content['pages']['timeline?']) _T ('pages-earlier') ?>
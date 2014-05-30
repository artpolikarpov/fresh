<?php if (array_key_exists ('notes-list', $content)) { ?>

<ul class="e2-note-list">
<?php foreach ($content['notes-list'] as $note): ?>
<li>
  <a href="<?= $note['href'] ?>" title=""><?= $note['title']?></a>
  <?php if (array_key_exists ('text-fragment', $note)) { ?>
  &nbsp; <?= $note['text-fragment']?>
  <?php } ?>
</li>
<?php endforeach; ?>
</ul>

<?php } ?>

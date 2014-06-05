<?php if ($content['class'] == 'found') { ?>

  <div class="e2-heading">
  
  <?php _T_FOR ('search') ?>
  
  <?php if (array_key_exists ('search-related-tag', $content)) { ?> 
  <div class="e2-heading-see-also">
    <?= _S ('gs--see-also-tag') ?> <a href="<?=$content['search-related-tag']['href']?>" class="e2-tag"><?=$content['search-related-tag']['name']?></a>
  </div>
  <?php } ?>
  
  </div>

<?php } elseif (array_key_exists ('heading', $content)) { ?>
  
  <div class="e2-heading">

    <?php if (array_key_exists ('superheading', $content)): ?>
      <div class="e2-heading-super"><?= $content['superheading'] ?></div>
    <?php endif ?>

    <h2>

      <?= $content['heading'] ?>
      
      <?php if (array_key_exists ('related-edit-href', $content)): ?>
      <a href="<?= $content['related-edit-href'] ?>" class="nu"><span class="i-edit"></span></a>
      <?php endif ?>
    
    </h2>
  
    <?php if (array_key_exists ('description', $content['tag'])): ?>
    <div class="e2-heading-description e2-text">
      <?= $content['tag']['description'] ?>
    </div>
    <?php endif ?>

    <?php _T_FOR ('year-months') ?>
    <?php _T_FOR ('month-days') ?>

  </div>

<?php } ?>